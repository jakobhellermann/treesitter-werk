import XCTest
import SwiftTreeSitter
import TreeSitterWerkfile

final class TreeSitterWerkfileTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_werkfile())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Werkfile grammar")
    }
}
