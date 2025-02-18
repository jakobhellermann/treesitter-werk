package tree_sitter_werkfile_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_werkfile "github.com/tree-sitter/tree-sitter-werkfile/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_werkfile.Language())
	if language == nil {
		t.Errorf("Error loading Werkfile grammar")
	}
}
