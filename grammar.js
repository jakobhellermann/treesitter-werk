/**
 * @file todo
 * @author Jakob Hellermann <jakob.hellermann@protonmail.com>
 * @license MIT OR Apache-2.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check


// @ts-ignore
let RE_IDENTIFIER = /[_\p{XID_Start}]([\p{XID_Continue}]|-)*/v;

module.exports = grammar({
  name: "werkfile",
  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {

    source_file: $ => repeat(seq($._global_statement, optional(";"))),

    comment: $ => token(prec(-10, /#.*/)),

    _global_statement: $ => choice(
      $.let_statement,
      $.config_statement,
      $.default_statement,
      $.build_recipe,
      $.task_recipe,
      $.include_statement,
    ),

    _valid_task_recipe: $ => choice(
      $.let_statement,
      $.build_statement,
      $.run_statement,
      $.info_statement,
      $.warn_statement,
      $.error_statement,
    ),
    _valid_build_recipe: $ => choice(
      $.let_statement,
      $.from_statement,
      $.depfile_statement,
      $.capture_statement,
      $.env_statement,
      $.env_remove_statement,
      $.run_statement,
    ),

    // statements
    let_statement: $ => seq("let", $.identifier, "=", $._expression),
    config_statement: $ => seq("config", $.identifier, "=", $._default_value_expression),
    default_statement: $ => seq("default", $.key, "=", $.value),
    build_recipe: $ => seq("build", field("pattern", $.pattern), "{",
      repeat(seq($._valid_build_recipe, optional(";"))),
      "}"),
    task_recipe: $ => seq("task", field("name", $.identifier), "{",
      repeat(seq($._valid_task_recipe, optional(";"))),
      "}"),
    include_statement: $ => seq("include", $._expression),

    run_statement: $ => seq("run", $.run_expression),
    from_statement: $ => seq("from", $._expression),
    build_statement: $ => seq("build", $._expression),
    depfile_statement: $ => seq("depfile", $._expression),
    capture_statement: $ => seq("capture", $.boolean),
    env_statement: $ => seq("env", $.string, "=", $.string),
    env_remove_statement: $ => seq("env-remove", $.string),

    // TODO
    info_statement: $ => seq("info", $._expression),
    warn_statement: $ => seq("warn", $._expression),
    error_statement: $ => seq("error", $._expression),
    key: $ => $.identifier,

    // expression
    // TODO: make operator expression kind
    _expression: $ => seq($._atomic_expression, repeat(seq("|", $.builtin_operator))),
    _default_value_expression: $ => $._expression,
    _atomic_expression: $ => choice(
      $.literal,
      $.identifier,
      $.index_expression,
      $.builtin_expression,
      $.identifier,
      seq("(", $._expression, ")"),
    ),
    literal: $ => choice(
      $.string,
      $.list,
    ),
    // TODO empty string
    string: $ => /"[^"]+"/,
    list: $ => seq("[", repeat(seq($._expression, ",")), optional($._expression), "]"),
    boolean: $ => choice("false", "true"),
    number: $ => /-?\d+/,

    index_expression: $ => prec.left(1, seq($._atomic_expression, "[", field("index", $._index), "]")),
    _index: $ => choice($._atomic_expression, $.number),

    builtin_expression: $ => choice(
      seq("which", $._atomic_expression),
      seq("env", $._atomic_expression),
      seq("glob", $._atomic_expression),
      seq("shell", $.run_expression),
      seq("read", $._atomic_expression),
      seq("error", $._atomic_expression),
    ),
    builtin_operator: $ => choice(
      seq("match", seq("{", repeat(seq($.pattern, "=>", $._expression)), "}")),
      seq("join", $.string), // "<separator>"
      seq("split", $.string),
      "lines",
      "flatten", // equivalent to [string]
      seq("filter", $.pattern),
      seq("filter-match", $.pattern, "=>", $._atomic_expression),
      seq("discard", $.pattern), // TODO detain in docs
      "dedup",
      seq("map", $._atomic_expression),
      seq("info", $._atomic_expression),
      seq("warn", $._atomic_expression),
      seq("error", $._atomic_expression),
      seq("assert-eq", $._atomic_expression),
      seq("assert-match", $.pattern),
      // array operations
      "len",
      "first",
      "last",
      "tail",
      $.string, // not documented
    ),

    run_expression: $ => choice(
      $.recipe_command,
      seq("[", repeat(seq($.recipe_command, ",")), optional($.recipe_command), "]"),
      seq("{", repeat(seq($.recipe_command, optional(";"))), "}"),
    ),

    recipe_command: $ => choice(
      $.string,
      seq("shell", $._atomic_expression),
      seq("write", seq($._atomic_expression, "to", $._atomic_expression)),
      seq("copy", seq($._atomic_expression, "to", $._atomic_expression)),
      seq("delete", $._atomic_expression),

      $.env_statement, // TODO not documented
      $.env_remove_statement, // TODO not documented

      seq("info", $.string),
      seq("warn", $.string),
      seq("error", $.string),
    ),

    // literal
    identifier: $ => RE_IDENTIFIER,
    value: $ => /"[^"]+"/,
    pattern: $ => /"[^"]+"/,
  }
});
