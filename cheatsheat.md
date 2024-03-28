### arms

| Rune  | Type             | Description                                  |
| ----- | ---------------- | -------------------------------------------- |
| `+\|` | lus              | Label a chapter (produces no arm)            |
| `+$`  | [term spec]      | Produces a structure arm (type definition)   |
| `++`  | [term hoon]      | Produces a (normal) arm                      |
| `+*`  | [term term spec] | Define a deferred expression (within a door) |

### cores

| Rune  | Type                              | Description                                           |
| ----- | --------------------------------- | ----------------------------------------------------- |
| `\|$` | (lest term) spec                  | Produces a mold                                       |
| `\|_` | spec alas (map term tome)         | Produces a door (a core with a sample)                |
| `\|:` | [hoon hoon]                       | Produces a gate with a custom sample                  |
| `\|%` | (unit term) (map term tome)       | Produces a core (battery and payload)                 |
| `\|.` | hoon                              | Produces a trap (a core with one arm)                 |
| `\|^` | hoon (map term tome)              | Produces a core with a \$ arm and computes the latter |
| `\|-` | hoon                              | Produces a trap and evaluate it                       |
| `\|~` | hoon [spec value]                 | Produces an iron gate                                 |
| `\|*` | hoon [spec value]                 | Produces a wet gate (a one-armed core with sample)    |
| `\|=` | hoon [spec value]                 | Produces a dry gate (a one-armed core with sample)    |
| `\|@` | hoon (unit term) (map term to me) | Produces a wet core (battery and payload)             |
| `\|?` | hoon                              | Produces a lead trap                                  |

### structures

| Rune                  | Type        | Description                                            |
| --------------------- | ----------- | ------------------------------------------------------ |
| `$\|`                 | [spec hoon] | foo Structure with verification                        |
| `$_`                  | hoon        | Structure that normalizes to an example                |
| `$%`                  | [list spec] | Structure that recognizes a union tagged by head atom  |
| `$:`                  | [list spec] |                                                        |
| `$<`                  | [spec spec] | Structure from filter (excluding)                      |
| `$>`                  | [spec spec] | Structure from filter (requiring)                      |
| `$-`                  | [spec spec] | Structure that normalizes to an example gate           |
| `$^`                  | hoon        | Structure that normalizes a union tagged by head depth |
| `$&`                  | [spec hoon] | Repaired structure (using normalizing gate)            |
| `$~`                  | [hoon spec] | Define a custom type default value                     |
| `$@`                  | [spec spec] | Structure that normalizes a union tagged by head atom  |
| `$=`                  | [skin spec] | Structure that wraps a face around another structure   |
| `$?`                  | [list spec] | Form a type from a union of other types                |
| `[a=foo b=bar c=baz]` |             | Form a cell type (tuple)                               |

### calls

| Rune | Type                                | Description                                                       |
| ---- | ----------------------------------- | ----------------------------------------------------------------- |
| `%_` | [wing (list (pair wing hoon))]      | Resolve a wing with changes, preserving type                      |
| `%:` | [hoon (list hoon)]                  | Call a gate with many arguments                                   |
| `%.` | [hoon hoon]                         | Call a gate, inverted                                             |
| `%-` | [hoon hoon]                         |                                                                   |
| `%^` | [hoon hoon hoon hoon]               | Call a gate with triple sample                                    |
| `%+` | [hoon hoon hoon]                    | Call a gate with a cell sample                                    |
| `%~` | [wing hoon hoon]                    | Evaluate an arm in a door                                         |
| `%*` | [wing hoon (list (pair wing hoon))] | Evaluate an expression, then resolve a wing with changes          |
| `%=` | [wing (list (pair wing hoon))]      | (gat smp) Call a gate foo(bar 1, baz 2) Resolve wing with changes |

### Cells

| Rune | Type                  | Description                                     |
| ---- | --------------------- | ----------------------------------------------- |
| `:_` | [hoon hoon]           | Construct a cell, inverted                      |
| `:-` | [hoon hoon]           | [foo bar]. foo^bar Construct a cell, 2-tuple    |
| `:^` | [hoon hoon hoon hoon] | [foo bar baz quz] Construct a cell, 2-tuple     |
| `:+` | [hoon hoon hoon]      | Construct a cell, 3 tuple                       |
| `:~` | (list hoon)           | ~[foo bar baz] Construct a null-terminated list |
| `:*` | (list hoon)           | [foo bar baz …] Construct an n-tuple            |
| `::` |                       | Mark a comment (digraph, not rune)              |

### Nock

| Rune         | Type          | Description                                      |
| ------------ | ------------- | ------------------------------------------------ |
| `.^`         | `[spec hoon]` | Load from namespace using Nock 12 (scry or peek) |
| `.+`         | `atom`        | +foo Increment an atom using Nock 4              |
| `.*`         | `[hoon hoon]` | Evaluate using Nock 2                            |
| `.=`         | `[hoon hoon]` | Test for equality using Nock 5                   |
| `.?`         | `(Hoon)`      | Test for a cell or atom using Nock 5             |
| `+foo`       |               | Increment an atom using Nock 4                   |
| `=(foo bar)` |               | Test for equality using Nock 5                   |

### Imports, Casts, Macros

| Rune               | Type                  | Description                                                     |
| ------------------ | --------------------- | --------------------------------------------------------------- |
| `/\|`              | fas                   | (++ford arm of %clay)                                           |
| `/$`               | %from %to             | Import mark conversion gate from /mar                           |
| `/%`               | %mark                 | import mark definition from /mar                                |
| `/-`               | foo, \*bar, baz=qux   | import a file from /sur                                         |
| `/+`               | foo, \*bar, baz=qux   | import a file from /lib                                         |
| `/~`               | foo, \*bar, baz=qux   | import a file from /sys                                         |
| `/=`               | clay-raw /\* myfile   | import results of user-specified path with face                 |
| `/gen/myfile/hoon` |                       | Import data contents (build-time static data)                   |
| `/path`            |                       | Import contents of dir as face=(map @ta type)                   |
| `/?`               |                       | Pin version number (not enforced)                               |
| `^\|`              | ket                   | Casts                                                           |
| `^\|`              | hoon                  | Convert a gold core to an iron core (invariant)                 |
| `^:`               | spec                  | factory gate (switch from regular parsing to spec/type parsing) |
| `^.`               | [hoon hoon]           | Typecast on value                                               |
| `^-`               | [spec hoon]           | `foo`bar Typecast by explicit type label                        |
| `^+`               | [hoon hoon]           | Typecast by inferred type (a fence)                             |
| `^&`               | hoon                  | Convert a core to a zinc core (covariant)                       |
| `^~`               | hoon                  | Fold constant at compile time                                   |
| `^*`               | spec                  | \*foo Bunt, produces default mold value                         |
| `^=`               | [skin hoon]           | Bind name to a value                                            |
| `^?`               | hoon                  | Convert a core to a lead core (bivariant)                       |
| `;\|`              | mic                   | Macros                                                          |
| `;:`               | [hoon (list hoon)]    | ;/ hoon Sail yield tape as XML element                          |
| `;<`               | [spec hoon hoon hoon] | Glue a pipeline together (monadic bind)                         |
| `;+`               | :(gat foo bar baz)    | Call a binary function as an n-ary function                     |
| `;~`               | [hoon (list hoon)]    | Glue a pipeline together (monadic bind)                         |
| `:*`               |                       | sAIL MAKE A LIST OF xml NODES                                   |
| `;=`               | marl:hoot             | Sail make a list of XML nodes                                   |

### Hints

| Syntax | Type                        | Description                                  |
| ------ | --------------------------- | -------------------------------------------- |
| `~\|`  | [hoon hoon]                 | Print in stack trace if failure              |
| `~$`   | [term hoon]                 | Profiler hit counter                         |
| `~_`   | [hoon hoon]                 | Print in stack trace, user-formatted         |
| `~%`   | [chum hoon tyre hoon]       | Register jet                                 |
| `~/`   | [chum hoon]                 | Register jet with registered context         |
| `~<`   | $@(term [term hoon]) hoon]  | Raw hint, applied to product ("backward")    |
| `~>`   | [$@(term [term hoon]) hoon] | Raw hint, applied to computation ("forward") |
| `~+`   | [@ hoon]                    | Cache computation                            |
| `~&`   | [@ hoon]                    | Cache computation                            |
| `~&`   | [@ud hoon hoon]             | Print (used for debugging)                   |
| `~=`   | [hoon hoon]                 | Detect duplicate                             |
| `~?`   | [@ud hoon hoon hoon]        | Print conditionally (used for debugging)     |
| `~!`   | [hoon hoon]                 | Print type if compilation future             |

### Subject

| Syntax | Type                                | Description                                         |
| ------ | ----------------------------------- | --------------------------------------------------- |
| `=\|`  | [spec hoon]                         | Combine default type value with the subject         |
| `=:`   | [(list (pair wing hoon)) hoon]      | Change multiple legs in the subject                 |
| `=,`   | [hoon hoon]                         | Exposes namespace (defines a bridge)                |
| `=.`   | [wing hoon hoon]                    | Change one leg in the subject                       |
| `=/`   | [skin hoon hoon]                    | Combine a named noun with the subject               |
| `=<`   | [hoon hoon]                         | Compose two expressions, inverted                   |
| `=>`   | [hoon hoon]                         | Compose two expressions                             |
| `=-`   | [hoon hoon]                         | Combine a new noun with the subject                 |
| `=^`   | [skin wing hoon hoon]               | Pin the head of a pair; changes a leg with the tail |
| `=+`   | [hoon hoon]                         | Combine a new noun with the subject                 |
| `=;`   | [skin hoon hoon]                    | Combine a named noun with the subject, inverted     |
| `=~`   | (List hoon)                         | Compose many expressions                            |
| `=*`   | [(pair term (unit spec)) hoon hoon] | Define an alias                                     |
| `=?`   | [wing hoon hoon hoon]               | Change one leg in the subject conditionally         |

### Conditionals

| Syntax             | Type                                | Description                                        |
| ------------------ | ----------------------------------- | -------------------------------------------------- |
| `?\|`              | (list hoon) \| (foo bar baz …)      |                                                    |
| `?:`               | [hoon hoon hoon]                    | Branch on a boolean test                           |
| `?.`               | [hoon hoon hoon]                    | Branch on a boolean test, inverted                 |
| `?<`               | [hoon hoon]                         | Assert false                                       |
| `?>`               | [hoon hoon]                         | Assert true                                        |
| `?-`               | [wing (list (pair spec hoon))]      | Switch against type union, no default              |
| `?^`               | [wing hoon hoon]                    | Branch on whether a swing of the subject is a cell |
| `?+`               | [wing hoon (list (pair spec hoon))] | Switch against a union, with default               |
| `?&`               | (list hoon)                         |                                                    |
| `?@`               | [wing hoon hoon]                    | Branch on whether a wing of the subject is an atom |
| `?~`               | [wing hoon hoon]                    | Branch on whether a wing of the subect is null     |
| `?=`               | [spec wing]                         | Test pattern match                                 |
| `?!`               | hoon logical NOT (loobean)          |                                                    |
| `&(foo bar baz …)` | Logical OR (loobean)                |                                                    |

### Terminators

| Syntax | Type | Description                                                 |
| ------ | ---- | ----------------------------------------------------------- |
| `==`   | -    | Terminate running series of expressions (digraph, not rune) |
| `--`   | -    | Terminate core expression                                   |

### Wild

| Syntax | Type         | Description                                   |
| ------ | ------------ | --------------------------------------------- |
| `!:`   | hoon         | Turn on stack trace                           |
| `,`    | [*hoon hoon] | Emit AST of expression, !,(\*hoon expression) |
| `!.`   | hoon         | Turn off stack trace                          |
| `!<`   | hoon         | Lift dynamic value into static context        |
| `!>`   | hoon         | Lift static value into dynamic context        |
| `!~`   | hoon         | Turn off stack trace                          |

Note: Some entries might be incomplete due to the complexity and variations in the original PDF content. If you need further assistance or specific sections, please let me know!
