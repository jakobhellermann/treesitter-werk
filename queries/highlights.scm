; todo: @escape

[
  "let"
  "config"
  "default"
  "build"
  "task"
  "from"
  "to"
  "depfile"
  "run"
  "include"
] @keyword

[
  "glob"
  "which"
  "env"
  "shell"
  "which"
  "info"
  "warn"
  "error"
  "write"
  "copy"
  "delete"
  "info"
  "warn"
  "error"
  "flatten"
  "join"
  "split"
  "map"
  "lines"
  "filter-match"
  "filter"
  "discard"
  "match"
  "assert-eq"
  "assert-match"
] @function.method.builtin

(identifier) @variable
(pattern) @string
(string) @string
(number) @number
(boolean) @constant.builtin

[
  "="
  "=>"
  "|"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  ","
  ";"
] @punctuation.delimiter

(comment) @comment