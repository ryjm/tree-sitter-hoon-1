# Contributing to tree-sitter-hoon

Thank you for your interest in contributing to tree-sitter-hoon! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Grammar Development](#grammar-development)
- [Testing](#testing)
- [Query Development](#query-development)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

Please note that this project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/tree-sitter-hoon
   cd tree-sitter-hoon
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the parser:
   ```bash
   npm run build
   ```
5. Run tests to ensure everything works:
   ```bash
   npm test
   ```

## Development Workflow

### Setting up your environment

1. Install the Tree-sitter CLI:
   ```bash
   npm install -g tree-sitter-cli
   ```

2. Install development tools:
   ```bash
   # For debugging and visualization
   npm install -g tree-sitter-graph
   ```

### Making changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to `grammar.js`

3. Regenerate the parser:
   ```bash
   tree-sitter generate
   ```

4. Run tests:
   ```bash
   tree-sitter test
   ```

5. Test specific features:
   ```bash
   tree-sitter test -f "your_test_name"
   ```

## Grammar Development

### Understanding the Grammar Structure

The grammar is organized into several key sections:

```javascript
module.exports = grammar({
  name: "hoon",
  
  rules: {
    // Entry point
    source_file: ($) => ...,
    
    // Main categories
    _hoonTall: ($) => ...,  // Tall-form (multiline) expressions
    _hoonWide: ($) => ...,  // Wide-form (inline) expressions
    _value: ($) => ...,     // Atomic values
    
    // Rune definitions
    _runeTall: ($) => ...,  // All tall-form runes
    _runeWide: ($) => ...,  // All wide-form runes
  }
});
```

### Adding a New Rune

1. **Identify the rune category** (bar, buc, cen, col, dot, fas, ket, lus, mic, sig, tis, wut, zap)

2. **Add the tall form** to `_runeTall`:
   ```javascript
   _runeTall: ($) =>
     choice(
       // ... existing runes
       $.yourRuneTall,
     ),
   ```

3. **Define the tall form rule**:
   ```javascript
   yourRuneTall: ($) => seq(
     alias("XX", $.rune),  // Replace XX with the actual rune
     $._Gap,
     $._hoonTall,
     // Add more components as needed
   ),
   ```

4. **Add the wide form** (if applicable) following the same pattern

5. **Add tests** for your rune (see Testing section)

### Grammar Best Practices

- Use `field()` to name important nodes for better AST navigation
- Use `alias()` to give consistent names to similar constructs
- Use `prec()` and `prec.left()`/`prec.right()` to resolve conflicts
- Prefer `choice()` over complex regular expressions
- Keep rule names consistent with Hoon terminology

## Testing

### Test File Structure

Test files are located in `test/corpus/` and follow this format:

```
==================
test_name
==================
hoon code to test
---

(expected_parse_tree)
```

### Writing Tests

1. Create or modify a test file in `test/corpus/`
2. Use descriptive test names
3. Test both valid and edge cases
4. Include comments explaining complex test cases

Example test:

```
==================
simple_tislus_binding
==================
=/  a  42
a
---

(source_file
  (tislusTall
    (rune)
    (Gap)
    (name)
    (Gap)
    (number))
  (Gap)
  (name))
```

### Running Tests

```bash
# Run all tests
tree-sitter test

# Run specific test file
tree-sitter test test/corpus/rune_tis.txt

# Run tests matching a pattern
tree-sitter test -f "tislus"

# Update test expectations
tree-sitter test -u
```

## Query Development

### Highlights Query

Edit `queries/highlights.scm` to improve syntax highlighting:

```scheme
; Mark all runes as operators
(rune) @operator

; Specific rune highlighting
(luslusTall (rune) @function.definition)  ; ++ arms
(lusbucTall (rune) @type.definition)      ; +$ types
```

### Tags Query

Create `queries/tags.scm` for code navigation:

```scheme
; Function definitions
(luslusTall
  name: (name) @name) @definition.function

; Type definitions  
(lusbucTall
  name: (name) @name) @definition.type
```

### Locals Query

Create `queries/locals.scm` for variable scoping:

```scheme
; Variable bindings
(tislusTall
  name: (name) @definition.var)
```

## Submitting Changes

### Before submitting

1. **Run all tests**: `npm test`
2. **Check the parser size**: Ensure `src/parser.c` isn't too large
3. **Update documentation**: If you added features, update the README
4. **Add tests**: All new features need test coverage
5. **Format code**: Follow the existing code style

### Pull Request Process

1. **Create a PR** with a clear title and description
2. **Reference any issues** your PR addresses
3. **Include test results** in your PR description
4. **Be responsive** to review feedback

### PR Title Format

Use conventional commit format:
- `feat: add support for new rune`
- `fix: correct parsing of nested cells`
- `docs: update installation instructions`
- `test: add tests for sail expressions`

## Style Guidelines

### JavaScript (grammar.js)

- Use 2-space indentation
- Use descriptive variable names
- Add comments for complex logic
- Group related rules together

### Test Files

- Use descriptive test names
- Keep tests focused and minimal
- Test edge cases separately
- Add comments for non-obvious test cases

### Documentation

- Use clear, concise language
- Include code examples
- Keep formatting consistent
- Update docs when changing behavior

## Getting Help

- Check existing issues and PRs
- Read the [Tree-sitter documentation](https://tree-sitter.github.io/tree-sitter/)
- Study the [Hoon language reference](https://developers.urbit.org/reference/hoon/rune)
- Ask questions in issues with the "question" label

Thank you for contributing to tree-sitter-hoon!