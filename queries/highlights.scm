;; Hoon Tree-sitter Syntax Highlighting
;; Comprehensive highlighting patterns for all Hoon constructs

;; Comments
(lineComment) @comment

;; Literals and Constants
(number) @number
(string) @string
(boolean) @constant.builtin
(date) @string.special
(tapeOrCord) @string
(knot) @string.special.symbol
(term) @constant
(aura) @type.builtin
(mold) @type
(unicode) @string.special
(ipAddress) @string.special.path
(bitcoinAddress) @string.special
(phonemic) @string.special

;; Paths and Navigation
(path) @string.special.path
(lark) @operator
(fullContext) @variable.builtin
(stripFace) @operator
(parent) @variable.builtin
(specialIndex) @number

;; Names and Identifiers
(name) @variable

;; Runes (categorized by function)
;; All runes
(rune) @keyword

;; Core construction runes
(barcenTall (rune) @keyword.function)      ; |%
(barcabTall (rune) @keyword.function)      ; |_
(bartisTall (rune) @keyword.function)      ; |=
(bardotTall (rune) @keyword.function)      ; |.
(barhepTall (rune) @keyword.repeat)        ; |-
(barketTall (rune) @keyword.function)      ; |^
(barcolTall (rune) @keyword.function)      ; |:
(barbucTall (rune) @keyword.function)      ; |$

;; Arm definitions
(luslusTall (rune) @keyword.function)      ; ++
(lusbucTall (rune) @type.definition)       ; +$
(lusbarTall (rune) @keyword.modifier)      ; +|
(lustarTall (rune) @keyword.import)        ; +*

;; Control flow
(wutcolTall (rune) @conditional)          ; ?:
(wutdotTall (rune) @conditional)          ; ?.
(wutlusTall (rune) @conditional)          ; ?+
(wuthepTall (rune) @conditional)          ; ?-
(wutgarTall (rune) @conditional)          ; ?>
(wutgalTall (rune) @conditional)          ; ?<
(wutbarTall (rune) @conditional)          ; ?|
(wutpamTall (rune) @conditional)          ; ?&
(wutketTall (rune) @conditional)          ; ?^
(wutpatTall (rune) @conditional)          ; ?@
(wutsigTall (rune) @conditional)          ; ?~
(wuttisTall (rune) @conditional)          ; ?=
(wutzapTall (rune) @conditional)          ; ?!

;; Subject modification
(tisgarTall (rune) @keyword.operator)     ; =>
(tisgalTall (rune) @keyword.operator)     ; =<
(tislusTall (rune) @keyword.operator)     ; =/
(tisbarTall (rune) @keyword.operator)     ; =|
(tiscolTall (rune) @keyword.operator)     ; =:
(tisdotTall (rune) @keyword.operator)     ; =.
(tisketTall (rune) @keyword.operator)     ; =^
(tistarTall (rune) @keyword.operator)     ; =*
(tishepTall (rune) @keyword.operator)     ; =-
(tissigTall (rune) @keyword.operator)     ; =~
(tismicTall (rune) @keyword.operator)     ; =;
(tiscomTall (rune) @keyword.operator)     ; =,
(tisfasTall (rune) @keyword.operator)     ; =/
(tiswutTall (rune) @keyword.operator)     ; =?

;; Type construction
(buccolTall (rune) @type)                 ; $:
(bucbarTall (rune) @type)                 ; $|
(bucpamTall (rune) @type)                 ; $&
(bucketTall (rune) @type)                 ; $^
(bucpatTall (rune) @type)                 ; $@
(bucsigTall (rune) @type)                 ; $~
(buccenTall (rune) @type)                 ; $%
(bucwutTall (rune) @type)                 ; $?
(buclusTall (rune) @type)                 ; $+
(buccabTall (rune) @type)                 ; $_
(buchepTall (rune) @type)                 ; $-
(bucgarTall (rune) @type)                 ; $>
(bucgalTall (rune) @type)                 ; $<
(buctisTall (rune) @type)                 ; $=

;; Hints and debugging
(sigbarTall (rune) @keyword.debug)        ; ~|
(siggarTall (rune) @keyword.debug)        ; ~>
(siggalTall (rune) @keyword.debug)        ; ~<
(siglusTall (rune) @keyword.debug)        ; ~+
(sigpamTall (rune) @keyword.debug)        ; ~&
(sigtisTall (rune) @keyword.debug)        ; ~=
(sigwutTall (rune) @keyword.debug)        ; ~?
(sigzapTall (rune) @keyword.debug)        ; ~!
(sigfasTall (rune) @keyword.debug)        ; ~/
(sigcenTall (rune) @keyword.debug)        ; ~%
(sigbucTall (rune) @keyword.debug)        ; ~$
(sigcabTall (rune) @keyword.debug)        ; ~_

;; Miscellaneous operations
(ketbarTall (rune) @operator)             ; ^|
(kethepTall (rune) @operator)             ; ^-
(ketlusTall (rune) @operator)             ; ^+
(kettisTall (rune) @operator)             ; ^=
(ketcolTall (rune) @operator)             ; ^:
(ketdotTall (rune) @operator)             ; ^.
(ketwutTall (rune) @operator)             ; ^?
(ketpamTall (rune) @operator)             ; ^&
(ketsigTall (rune) @operator)             ; ^~
(kettarTall (rune) @operator)             ; ^*

;; Constant operations
(dotlusTall (rune) @operator)             ; .+
(dottisTall (rune) @operator)             ; .=
(dotketTall (rune) @operator)             ; .^
(dotwutTall (rune) @operator)             ; .?
(dottarTall (rune) @operator)             ; .*

;; Core operations
(cenlusTall (rune) @operator)             ; %+
(cenhepTall (rune) @operator)             ; %-
(cencolTall (rune) @operator)             ; %:
(cendotTall (rune) @operator)             ; %.
(cenketTall (rune) @operator)             ; %^
(centisTall (rune) @operator)             ; %=
(centarTall (rune) @operator)             ; %*
(censigTall (rune) @operator)             ; %~
(cencabTall (rune) @operator)             ; %_

;; Collections
(colhepTall (rune) @constructor)          ; :-
(collusTall (rune) @constructor)          ; :+
(colketTall (rune) @constructor)          ; :^
(coltarTall (rune) @constructor)          ; :*
(colsigTall (rune) @constructor)          ; :~
(colcabTall (rune) @constructor)          ; :_

;; Evaluation
(zaptisTall (rune) @operator)             ; !=
(zapgalTall (rune) @operator)             ; !<
(zapgarTall (rune) @operator)             ; !>
(zapcolTall (rune) @operator)             ; !:
(zapmicTall (rune) @operator)             ; !;
(zapwutTall (rune) @operator)             ; !?
(zappatTall (rune) @operator)             ; !@
(zapdotTall (rune) @operator)             ; !.
(zapcomTall (rune) @operator)             ; !,
(zapzap) @operator                         ; !!

;; Sail (XML) constructs
(sailTagTall (name) @tag)
(sailTagWide (name) @tag)
(sailId) @property
(sailClass) @attribute
(sailAttributeTall) @attribute
(sailAttributeWide) @attribute

;; Terminators and delimiters
(seriesTerminator) @punctuation.delimiter
(coreTerminator) @punctuation.delimiter

;; Punctuation
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
  "."
  ";"
  ":"
] @punctuation.delimiter

;; Function calls and special forms
(gateCall (name) @function.call)
(cell) @punctuation.bracket

;; Special highlighting for common patterns
((luslusTall
  armName: (name) @function.definition))

((lusbucTall
  name: (name) @type.definition))

((tislusTall
  (name) @variable.definition))

;; Irregular forms get special highlighting
(increment) @operator
(typeUnion) @type
(normalize) @type

;; Highlight certain conventional arm names
((luslusTall
  armName: (name) @function.builtin
  (#match? @function.builtin "^(on-\\w+|ab|by|in|ja|ju|my|og|so|to|ut|yo|za)$")))

;; Test arms
((luslusTall
  armName: (name) @function.test
  (#match? @function.test "^test-")))

;; Error highlighting for common mistakes
(ERROR) @error

