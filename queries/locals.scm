;; Local variable scoping for Hoon
;; This file defines scoping rules for variables and their references

;; Scopes
(source_file) @scope
(barcenTall) @scope   ; |% core
(barcabTall) @scope   ; |_ door
(bartisTall) @scope   ; |= gate
(barhepTall) @scope   ; |- trap
(barketTall) @scope   ; |^ kick
(bardotTall) @scope   ; |. trap

;; Variable definitions

;; =/ name value -- let binding
(tislusTall
  (name) @definition.variable)

;; =| name -- default value binding
(tisbarTall
  (name) @definition.variable)

;; =^ name value -- pin with changes
(tisketTall
  (name) @definition.variable)

;; =* name value -- alias
(tistarTall
  (name) @definition.variable)

;; =+ value -- unnamed let
(tislusTall) @definition.variable

;; => value . -- subject modification creates new scope
(tisgarTall) @scope

;; =< value . -- inverted subject modification
(tisgalTall
  (name) @definition.variable)

;; Pattern matching variable bindings
;; ?+ scrutinee default [pattern value]...
(wutlusTall
  (specTall
    (name) @definition.parameter)) @scope

;; ?- scrutinee [pattern value]...
(wuthepTall
  (specTall
    (name) @definition.parameter)) @scope

;; Function parameters
(bartisTall
  (specTall
    (name) @definition.parameter)) @scope

(barbucTall
  (name) @definition.parameter) @scope

;; Face wrapping creates a binding
(wrapFace
  (name) @definition.variable)

;; Import definitions
(lustarTall
  alias: (name) @definition.variable)

;; Variable references
(name) @reference.variable

;; Special scope rules

;; Subject path access doesn't create new bindings
(fullContext) @reference.builtin
(stripFace) @reference.builtin
(parent) @reference.builtin

;; Wing paths reference existing bindings
(wingPath
  (name) @reference.variable)

;; Function calls reference arm names
(gateCall
  (name) @reference.call)