/**
 * @file todo
 * @author Jakob Hellermann <jakob.hellermann@protonmail.com>
 * @license MIT OR Apache-2.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "werkfile",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
