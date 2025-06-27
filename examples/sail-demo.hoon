::  Sail syntax demonstration
::
|=  [title=@t items=(list @t)]
^-  manx
;html
  ;head
    ;title: {(trip title)}
    ;style: '''
      body { font-family: sans-serif; }
      .item { padding: 10px; }
    '''
  ==
  ;body
    ;h1: {(trip title)}
    ;ul
      ;*  %+  turn  items
          |=  item=@t
          ;li(class "item"): {(trip item)}
    ==
  ==
==