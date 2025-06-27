# Testing Guide for tree-sitter-hoon

This guide explains how to write and run tests for the tree-sitter-hoon grammar.

## Table of Contents

- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Test Organization](#test-organization)
- [Best Practices](#best-practices)
- [Debugging Failed Tests](#debugging-failed-tests)

## Test Structure

Tree-sitter uses a simple test format. Each test file contains multiple test cases separated by equals signs.

### Basic Format

```
==================
test_name
==================
hoon code here
---

(expected_syntax_tree)
```

### Example Test

```
==================
simple_number
==================
42
---

(source_file
  (number))
```

## Writing Tests

### 1. Choose the Right Test File

Tests are organized by feature in `test/corpus/`:

- `aura.txt` - Type/aura tests
- `rune_tis.txt` - Tests for tis (=) runes
- `sail.txt` - Sail (XML) syntax tests
- etc.

### 2. Write Descriptive Test Names

Use clear, descriptive names that explain what's being tested:

```
==================
tislus_with_nested_expression
==================
=/  result  (add 2 2)
result
---
```

### 3. Include Edge Cases

Test both normal usage and edge cases:

```
==================
cell_empty
==================
[]
---

(source_file
  (cell))

==================
cell_single_element
==================
[42]
---

(source_file
  (cell (number)))

==================
cell_nested
==================
[[1 2] [3 4]]
---

(source_file
  (cell
    (cell (number) (number))
    (cell (number) (number))))
```

### 4. Test Error Recovery

Include tests for malformed input to ensure the parser recovers gracefully:

```
==================
incomplete_rune
==================
?:
---

(source_file
  (ERROR))
```

## Running Tests

### Run All Tests

```bash
tree-sitter test
```

### Run Specific Test File

```bash
tree-sitter test test/corpus/rune_tis.txt
```

### Run Tests Matching a Pattern

```bash
tree-sitter test -f "tislus"
```

This runs only tests with "tislus" in their name.

### Update Test Expectations

When you've changed the grammar and need to update expected outputs:

```bash
tree-sitter test -u
```

**Warning**: Review changes carefully before committing!

### Debug Mode

For detailed parsing information:

```bash
tree-sitter parse -d test.hoon
```

## Test Organization

### File Naming Convention

- `rune_XXX.txt` - Tests for specific rune categories
- `XXX.txt` - Tests for specific features (e.g., `sail.txt`, `number.txt`)
- `irregularForm.txt` - Tests for irregular syntax forms

### Test Categories

1. **Value Tests** - Basic literals and atoms
   - `number.txt`
   - `string.txt` (tape.txt, cord.txt)
   - `term.txt`
   - `boolean.txt`

2. **Rune Tests** - Organized by rune category
   - `rune_bar.txt` - Bar runes (|%, |=, etc.)
   - `rune_tis.txt` - Tis runes (=/, =<, etc.)
   - `rune_wut.txt` - Wut runes (?:, ?=, etc.)

3. **Complex Structure Tests**
   - `wing.txt` - Wing paths and access
   - `sail.txt` - Sail expressions
   - `irregularForm.txt` - Syntactic sugar

## Best Practices

### 1. Test One Thing at a Time

Each test should focus on a single feature or edge case:

```
==================
tislus_simple_binding
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

### 2. Use Meaningful Examples

Prefer realistic code examples over abstract ones:

```
==================
gate_add_two_numbers
==================
|=  [a=@ b=@]
(add a b)
---
```

### 3. Document Complex Tests

Add comments for non-obvious test cases:

```
==================
wing_path_with_faces
==================
:: Testing wing path resolution through faces
a.b.c
---

(source_file
  (lineComment)
  (Gap)
  (wingPath
    (name)
    (name)
    (name)))
```

### 4. Test Both Forms

For runes with both tall and wide forms, test both:

```
==================
wutcol_tall
==================
?:  flag
  %yes
%no
---

==================
wutcol_wide
==================
?:(flag %yes %no)
---
```

### 5. Progressive Complexity

Start with simple cases and build up to complex ones:

1. Basic usage
2. With different argument types
3. Nested usage
4. Edge cases
5. Error cases

## Debugging Failed Tests

### 1. Examine the Diff

When a test fails, tree-sitter shows a diff:

```
Expected:
  (source_file (number))
Actual:
  (source_file (ERROR))
```

### 2. Use Parse Debug Mode

```bash
tree-sitter parse -d failing-code.hoon
```

This shows:
- Token-by-token parsing
- Rule applications
- Parse stack state

### 3. Simplify the Test

If a complex test fails, create simpler versions to isolate the issue:

```hoon
:: Original failing test
=/  result  %-  add  [2 2]

:: Simplified versions
=/  result  42
%-  add  [2 2]
[2 2]
```

### 4. Check Grammar Conflicts

Look for:
- Precedence issues
- Ambiguous rules
- Missing alternatives in choice rules

### 5. Verify Token Patterns

Ensure lexical rules (strings, numbers, etc.) match correctly:

```bash
tree-sitter parse -d <<< "~2021.1.1"
```

## Adding New Test Files

When adding support for new features:

1. Create a new test file in `test/corpus/`
2. Start with basic cases
3. Add edge cases
4. Include error recovery tests
5. Document any special considerations

Example structure for a new feature:

```
==================
feature_basic
==================
...

==================
feature_with_nesting
==================
...

==================
feature_edge_case_empty
==================
...

==================
feature_error_incomplete
==================
...
```

## Continuous Integration

Tests should be run:
- Before committing changes
- In pull requests
- As part of CI/CD pipeline

GitHub Actions example:

```yaml
- name: Run tests
  run: |
    npm install
    npm test
```

## Common Pitfalls

1. **Whitespace in Expected Output**: The expected syntax tree must match exactly, including indentation

2. **Gap Nodes**: Remember that `Gap` nodes appear in tall forms between elements

3. **Field Names**: Ensure field names in tests match those in grammar.js

4. **Hidden Rules**: Rules starting with `_` won't appear in the parse tree

5. **Aliases**: Aliased nodes appear with their alias name, not the original

## Resources

- [Tree-sitter Test Format](https://tree-sitter.github.io/tree-sitter/creating-parsers#command-test)
- [Debugging Parsers](https://tree-sitter.github.io/tree-sitter/creating-parsers#debugging)
- [Example Tests](https://github.com/tree-sitter/tree-sitter-javascript/tree/master/test/corpus)