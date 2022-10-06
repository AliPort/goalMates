# array-keys

[![Build Status](http://img.shields.io/travis/silverbucket/array-keys.svg?style=flat)](http://travis-ci.org/silverbucket/array-keys)
[![Code Climate](http://img.shields.io/codeclimate/github/silverbucket/array-keys.svg?style=flat)](https://codeclimate.com/github/silverbucket/array-keys)
[![license](https://img.shields.io/npm/l/array-keys.svg?style=flat)](https://npmjs.org/package/array-keys)
[![downloads](http://img.shields.io/npm/dm/array-keys.svg?style=flat)](https://npmjs.org/package/array-keys)
[![release](http://img.shields.io/github/release/silverbucket/array-keys.svg?style=flat)](https://github.com/silverbucket/array-keys/releases)

Very simple library to manage array elements using a key instead of array index position. When dealing with very large sets of data all organized in an object reference, if the object structure is changing a lot you can end up with memory leaks and slow performance. In these cases it's better to keep an array of objects instead of and object of objects. The cost of iterating through the array is cheaper than the lack of garbage collection which can occur in large, changing, object hashes.

## environments

Should run in both node.js and browser environments.

## basic usage example

```javascript
var ak = new ArrayKeys({
  identifier: 'key' // defaults to `id`
});

ak.getRecord('myInvalidKey'}); // returns undefined

ak.addRecord({
  key: 'myKey1',
  value: 'hello world!'
}); // returns true

ak.getRecord('myKey1'); // returns { key: 'myKey1', value: 'hello world!' }

ak.addRecord({
  key: 'myKey2',
  value: 'hello space!'
}); // returns true


ak.forEachRecord(function (record) {
  // this function is called once for each record
}).finally(function (count) {
  // function called after the above callback is called for each record
  // count is the total number of records processed
});

ak.getIdentifiers(); // returns ['myKey1', 'myKey2']
```


## events

`ArrayKeys` also optionally supports emitting events. This functionality must be explicity enabled during object instantiation.

### supported events
* `add`
* `remove`
* `update`

### example

```javascript
var ak = new ArrayKeys({
  emitEvents: true
});

ak.events.on('add', function (record) {
  console.log(record.id); // 'foobar'
});

ak.addRecord({
    id: 'foobar',
    here: [ 'is', 'some' ],
    data: true
});

```

## API

### constructor

```javascript
var ak = new ArrayKeys({
  identifier: 'id',
  emitEvents: true
});
```

### addRecord
Add a new record.
```javascript
ak.addRecord({
  id: 'helloworld123',
  foo: 'bar'
});
ak.addRecord({
  id: 'pizza777',
  blah: [ 1, 2, 3 ]
});
```

### getRecord
Get a record by it's identifier.
```javascript
var record = ak.getRecord('helloworld123');
```

### getIdentifiers
Get an array of the values of the record identifiers.
```javascript
var ids = ak.getIdentifiers(); // 'helloworld123', 'pizza777'
```
### exists
Indicates whether a record exists by returning `true` or `false`.
```javascript
if (ak.exists('blahblahblah')) {
  console.log('yes!');
} else {
  console.log('no');
}
// returns false, 'no'
```

### getIndex
Returns the number of the position of the record, specified by identifier.
```javascript
var position = ak.getIndex('pizza777'); // returns 1
```

### forEachRecord
Calls a callback handler function for each record in the list, asyncronously.
```javascript
ak.forEachRecord(function (record, index) {
  // ... do something with record
}).finally(function (count) {
  // ... do something at the end of the operation. First param is the number
  // of items processed.
})
```

### mapRecords
Calls a callback transform function for each record in the list.  
Your original list is not mutated. Returns an array.
```javascript
ak.mapRecords(function(record, index) {
  return record.id + '-' + index;
});
```
### removeRecord
Removes the record specified by identifier.
```javascript
ak.removeRecord('helloworld123');
```

### removeAll
Removes all records.
```javascript
ak.removeAll();
```

### events

#### update
```javascript
ak.events.on('update', function (record){
  ...
});
```
#### add
```javascript
ak.events.on('add', function (record){
  ...
});
```
#### remove
```javascript
ak.events.on('remove', function (record){
  ...
});
```
## credits

Project developed and maintained by [Nick Jennings](http://github.com/silverbucket)

