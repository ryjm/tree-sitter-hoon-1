;; Tags for code navigation in Hoon
;; This file defines symbols for jump-to-definition and code outline features

;; Core definitions
(barcenTall
  (luslusTall
    armName: (name) @name) @definition.function)

(barcenTall
  (lusbucTall
    name: (name) @name) @definition.type)

;; Door (parameterized core) definitions
(barcabTall
  (luslusTall
    armName: (name) @name) @definition.method)

(barcabTall
  (lusbucTall
    name: (name) @name) @definition.field)

;; Chapter labels
(lusbarTall
  (name) @name
  (#set! "kind" "Section")) @definition.namespace

;; Standalone arm definitions
(luslusTall
  armName: (name) @name) @definition.function

;; Standalone type definitions
(lusbucTall
  name: (name) @name) @definition.type

;; Variable bindings
(tislusTall
  (name) @name) @definition.variable

(tisgalTall
  (name) @name) @definition.variable

;; Face wraps (named values)
(wrapFace
  (name) @name) @definition.constant

;; Import aliases
(lustarTall
  alias: (name) @name) @definition.variable

;; Pattern matches in switch statements
(wutlusTall
  (specTall (name) @name) @definition.parameter)

;; Function calls (references)
(gateCall
  (name) @name) @reference.call

;; Type references
(mold
  (name) @name) @reference.type

;; Wing paths (data access)
(wingPath
  (name) @name) @reference.variable

;; Door/core field access
(wingPath
  (fullContext) @reference.type
  (name) @name) @reference.field

;; Special built-in references
(fullContext) @reference.builtin
(stripFace) @reference.builtin
(lark) @reference.builtin

;; Sail (XML-like) tags
(sailTagTall
  (name) @name) @definition.type

(sailTagWide
  (name) @name) @definition.type

;; Comments that might contain tags
(lineComment) @comment

;; Helper predicates for filtering
((luslusTall
  armName: (name) @name) @definition.function
  (#match? @name "^test-"))

((luslusTall
  armName: (name) @name) @definition.function
  (#match? @name "^on-"))