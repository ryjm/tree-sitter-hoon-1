# tree-sitter-hoon

A Tree-sitter grammar for Hoon, the programming language of Urbit.

[![npm version](https://img.shields.io/npm/v/tree-sitter-hoon.svg)](https://www.npmjs.com/package/tree-sitter-hoon)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## About Hoon

Hoon is a strictly typed functional programming language that compiles to Nock, the low-level combinator language of Urbit. It features:

- A unique runic syntax where digraphs (two-character symbols) define operations
- Functional programming with subject-oriented paradigm
- Strong static typing with type inference
- Built-in support for web content through Sail (Hoon's XML syntax)

## Features

This Tree-sitter grammar provides:

- ✅ Complete syntax highlighting for all Hoon runes
- ✅ Support for Sail (Hoon's XML-like syntax)
- ✅ Accurate parsing of complex nested structures
- ✅ Comprehensive test coverage
- ✅ Editor integrations (VS Code, Neovim, Emacs, etc.)

## Installation

### Via npm

```bash
npm install tree-sitter-hoon
```

### Via cargo

```bash
cargo add tree-sitter-hoon
```

### From source

```bash
git clone https://github.com/urbit-pilled/tree-sitter-hoon
cd tree-sitter-hoon
npm install
npm run build
```

## Using tree-sitter with the tree-sitter command line tool

You can install the tree-sitter-cli with cargo:

```bash
cargo install tree-sitter-cli
```

or with npm:

```bash
npm install tree-sitter-cli
```

You can also download a pre-built binary for your platform from the [tree-sitter releases](https://github.com/tree-sitter/tree-sitter/releases/) page.

### Command line usage

- **Generate the parser**: `tree-sitter generate`
- **Run tests**: `tree-sitter test`
- **Parse a file**: `tree-sitter parse <hoon-file>`
- **Show syntax highlighting**: `tree-sitter highlight <hoon-file>`

### Example

```bash
# Parse a Hoon file and show the syntax tree
tree-sitter parse examples/hello.hoon

# Run tests for specific rune categories
tree-sitter test -f rune_tis  # Test tis (=) runes
tree-sitter test -f sail      # Test Sail expressions
```

## Editor Integrations

For detailed instructions on integrating with your editor, see:
https://github.com/urbit-pilled/hoon-ts-editors

### Quick Setup

#### Neovim (with nvim-treesitter)

```lua
-- In your Neovim config
require'nvim-treesitter.configs'.setup {
  ensure_installed = { "hoon" },
  highlight = {
    enable = true,
  },
}
```

#### VS Code

Install the [Hoon Language Support](https://marketplace.visualstudio.com/items?itemName=urbit-pilled.hoon) extension.

## Grammar Overview

The grammar is organized around Hoon's core concepts:

### Runes

Hoon uses two-character symbols (runes) as its primary syntax:

- **Core runes** (`|%`, `|_`, `|-`, etc.) - Define cores (objects)
- **Flow control** (`?:`, `?=`, `?.`, etc.) - Conditionals and type testing
- **Binding** (`=<`, `=>`, `=/`, etc.) - Variable binding and composition
- **Type construction** (`$:`, `$%`, `$@`, etc.) - Type definitions

### Values

- **Atoms**: Numbers (`42`), strings (`"hello"`), terms (`%foo`)
- **Cells**: Pairs and tuples (`[a b]`, `[a b c]`)
- **Wings**: Paths to data (`.a`, `a.b.c`, `+>.foo`)

### Special Forms

- **Sail**: XML-like syntax for web content
- **Irregular forms**: Syntactic sugar (`+(42)` for `.+(42)`)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/urbit-pilled/tree-sitter-hoon
cd tree-sitter-hoon

# Install dependencies
npm install

# Make changes to grammar.js
# ...

# Regenerate the parser
npm run build

# Run tests
npm test
```

## Documentation

- [Grammar Documentation](docs/GRAMMAR.md) - Technical details about the grammar
- [Testing Guide](docs/TESTING.md) - How to write and run tests
- [Hoon Language Reference](https://developers.urbit.org/reference/hoon/rune) - Official Hoon documentation

## License

MIT © [urbit-pilled]

## Acknowledgments

- The Urbit Foundation for the Hoon language specification
- The Tree-sitter team for the parsing framework
- Contributors to this grammar

## Related Projects

- [hoon-language-server](https://github.com/urbit/hoon-language-server) - Language server for Hoon
- [hoon.vim](https://github.com/urbit/hoon.vim) - Vim syntax highlighting for Hoon
- [vscode-hoon](https://github.com/urbit/vscode-hoon) - VS Code extension for Hoon
