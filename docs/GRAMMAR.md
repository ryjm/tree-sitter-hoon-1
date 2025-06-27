# Tree-sitter Hoon Grammar Documentation

This document provides technical details about the tree-sitter-hoon grammar implementation.

## Table of Contents

- [Grammar Structure](#grammar-structure)
- [Design Decisions](#design-decisions)
- [Parsing Strategy](#parsing-strategy)
- [Conflict Resolution](#conflict-resolution)
- [Extension Points](#extension-points)
- [Performance Considerations](#performance-considerations)

## Grammar Structure

### Entry Point

The grammar's entry point is the `source_file` rule:

```javascript
source_file: ($) =>
  seq(
    $._hoonTall,
    repeat1(seq($._Gap, $._hoonTall)),
    optional($._Gap)
  )
```

This expects a series of tall-form Hoon expressions separated by gaps (whitespace/comments).

### Core Categories

The grammar is organized around these main categories:

1. **Hoon Expressions** (`_hoonTall`, `_hoonWide`)
   - Tall forms: Multi-line expressions with explicit gaps
   - Wide forms: Inline expressions with parentheses

2. **Runes** (`_runeTall`, `_runeWide`)
   - Organized by first character (bar, buc, cen, col, etc.)
   - Each rune has tall and/or wide forms

3. **Values** (`_value`)
   - Atomic values: numbers, strings, terms, etc.
   - Compound values: cells, paths, wings

4. **Specifications** (`_specTall`, `_specWide`)
   - Type specifications and molds
   - Used in gates, cores, and type definitions

### Node Types

The grammar uses several node type patterns:

- **Named fields**: Important sub-expressions are labeled with `field()`
- **Aliases**: Runes are aliased as `$.rune` for consistent highlighting
- **Hidden rules**: Rules prefixed with `_` don't appear in the AST

## Design Decisions

### Tall vs Wide Forms

Hoon has two syntactic forms for most expressions:

- **Tall form**: Uses gaps (whitespace) for structure
- **Wide form**: Uses parentheses and is more compact

Example:
```hoon
:: Tall form
?:  condition
  then-branch
else-branch

:: Wide form
?:(condition then-branch else-branch)
```

The grammar maintains separate rules for each form to ensure accurate parsing.

### Gap Handling

Gaps (whitespace and comments) are significant in tall forms. The grammar uses:

```javascript
_Gap: $ => /\s+|::.*/
```

This matches either whitespace or line comments starting with `::`.

### Precedence

The grammar uses precedence to resolve ambiguities:

```javascript
prec.left(0, seq(...))  // Left-associative
prec.right(1, seq(...)) // Right-associative with higher precedence
prec(2, choice(...))    // Non-associative with specific precedence
```

Key precedence rules:
- Wing paths bind tighter than most operations
- Cell construction is right-associative
- Type specifications have lower precedence than values

## Parsing Strategy

### Rune Organization

Runes are organized by their first character to improve parsing efficiency:

```javascript
_runeTall: ($) =>
  choice(
    // Bar runes (|)
    $.barbucTall, $.barcabTall, $.barcolTall, ...
    
    // Buc runes ($)
    $.bucbarTall, $.buccabTall, $.buccenTall, ...
    
    // ... etc for each rune category
  )
```

### Irregular Forms

Hoon has many irregular forms (syntactic sugar). These are handled separately:

```javascript
_irregularForms: ($) =>
  choice(
    $.increment,      // +(value)
    $.decrement,     // -(value)
    $.gateCall,      // (gate arg1 arg2)
    $.typeUnion,     // ?(%a %b %c)
    // ... more irregular forms
  )
```

### Sail Integration

Sail (Hoon's XML syntax) is integrated into the main grammar:

```javascript
sailExpression: ($) =>
  choice(
    $.sailWide,
    $.sailTall
  )
```

This allows mixing Hoon and Sail in the same file.

## Conflict Resolution

### Common Conflicts

1. **Cell vs Parentheses**: `[a b]` could be a cell or grouping
   - Resolved by context and precedence

2. **Wing Paths vs Dot Notation**: `.a.b.c` parsing
   - Uses specific wing path rules

3. **Irregular Forms vs Regular**: `+(42)` vs `.+(42)`
   - Irregular forms have higher precedence

### Resolution Strategies

1. **Use explicit precedence**: Assign precedence values to ambiguous rules
2. **Order matters**: Place more specific rules before general ones
3. **Context sensitivity**: Use different rules in different contexts

## Extension Points

### Adding New Runes

To add a new rune:

1. Add to the appropriate `_runeTall`/`_runeWide` choice
2. Define the tall form rule:
   ```javascript
   newRuneTall: ($) => seq(
     alias("XX", $.rune),
     $._Gap,
     // ... components
   )
   ```
3. Define the wide form (if applicable)
4. Add tests in `test/corpus/`

### Adding Value Types

To add a new value type:

1. Add to the `_value` choice
2. Define the parsing rule
3. Update highlights.scm for syntax highlighting
4. Add test cases

### Extending Sail

Sail expressions can be extended by modifying:
- `sailTagTall`/`sailTagWide` for new tag types
- `sailAttribute` for new attribute formats
- `sailContent` for new content types

## Performance Considerations

### Parser Size

The generated `src/parser.c` can become large. To manage size:

1. **Avoid repetition**: Use helper functions for common patterns
2. **Simplify complex rules**: Break down into smaller pieces
3. **Limit choice branches**: Too many choices increase parser size

### Parsing Performance

For better performance:

1. **Order choices efficiently**: Put common cases first
2. **Use character classes**: `/[a-z]+/` instead of multiple choices
3. **Minimize backtracking**: Use clear disambiguation

### Memory Usage

The grammar avoids:
- Deep recursion in rules
- Unnecessary capturing of large text spans
- Complex regular expressions that require backtracking

## Debugging

### Common Issues

1. **Shift/reduce conflicts**: Check precedence and associativity
2. **Failed parsing**: Use `tree-sitter parse -d` for debug output
3. **Wrong AST structure**: Verify field names and rule structure

### Testing Strategy

1. **Unit tests**: Each rune and construct has dedicated tests
2. **Integration tests**: Complex expressions combining multiple features
3. **Error recovery**: Tests for malformed input

### Tools

- `tree-sitter generate`: Regenerate parser after changes
- `tree-sitter test`: Run test suite
- `tree-sitter parse`: Parse individual files
- `tree-sitter highlight`: Test syntax highlighting

## Future Improvements

### Planned Enhancements

1. **Better error recovery**: More robust handling of malformed input
2. **Performance optimization**: Further parser size reduction
3. **Extended Sail support**: Full HTML/XML attribute handling
4. **Semantic analysis**: Type-aware parsing for better highlighting

### Known Limitations

1. **Context sensitivity**: Some Hoon constructs require semantic information
2. **Whitespace significance**: Complex gap handling in certain contexts
3. **Parser size**: Large grammar leads to large C parser file

## References

- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)
- [Hoon Language Reference](https://developers.urbit.org/reference/hoon/rune)
- [Hoon Syntax Guide](https://developers.urbit.org/guides/core/hoon-school/)