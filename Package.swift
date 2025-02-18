// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterWerkfile",
    products: [
        .library(name: "TreeSitterWerkfile", targets: ["TreeSitterWerkfile"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterWerkfile",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterWerkfileTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterWerkfile",
            ],
            path: "bindings/swift/TreeSitterWerkfileTests"
        )
    ],
    cLanguageStandard: .c11
)
