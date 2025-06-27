::  FizzBuzz implementation in Hoon
::
|=  n=@
^-  (list tape)
=/  i  1
=/  acc  *(list tape)
|-
?:  (gth i n)
  (flop acc)
=/  fizz  =(0 (mod i 3))
=/  buzz  =(0 (mod i 5))
=/  line
  ?:  &(fizz buzz)  "FizzBuzz"
  ?:  fizz          "Fizz"
  ?:  buzz          "Buzz"
  (scow %ud i)
$(i +(i), acc [line acc])