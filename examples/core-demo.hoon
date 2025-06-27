::  Demonstration of cores and doors
::
|%
::  A simple counter door
::
++  counter
  |_  count=@
  ::  increment the counter
  ++  inc  ^-  @
    +(count)
  ::  decrement the counter  
  ++  dec  ^-  @
    ?:  =(count 0)  0
    (sub count 1)
  ::  reset to zero
  ++  reset  ^-  @
    0
  --
::  Math utilities
::
++  math
  |%
  ++  factorial
    |=  n=@
    ^-  @
    ?:  =(n 0)  1
    (mul n $(n (sub n 1)))
  ::
  ++  fibonacci  
    |=  n=@
    ^-  @
    ?:  =(n 0)  0
    ?:  =(n 1)  1
    (add $(n (sub n 1)) $(n (sub n 2)))
  --
--