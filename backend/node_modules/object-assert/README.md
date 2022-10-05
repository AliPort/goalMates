object-assert
=============

A simple function for comparing two objects for equality.

## initialize

### node
```
var objectAssert = require('object-assert');
```

## use
```
if (objectAssert(obj1, obj2)) {
    // objects match
} else {
    // objects don't match...
    console.log("they don't match! here's why: " + objectAssert.message);
}
```


```
objectAssert(obj1, obj2);

console.log('result: '  + objectAssert.result);  // boolean
console.log('message: ' + objectAssert.message); // string
```
