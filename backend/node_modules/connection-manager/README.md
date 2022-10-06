# node-connection-manager

[![Greenkeeper badge](https://badges.greenkeeper.io/silverbucket/node-connection-manager.svg)](https://greenkeeper.io/)

[![Build Status](http://img.shields.io/travis/silverbucket/node-connection-manager.svg?style=flat)](http://travis-ci.org/silverbucket/node-connection-manager)
[![Code Climate](http://img.shields.io/codeclimate/github/silverbucket/node-connection-manager.svg?style=flat)](https://codeclimate.com/github/silverbucket/node-connection-manager)
[![license](https://img.shields.io/npm/l/connection-manager.svg?style=flat)](https://npmjs.org/package/connection-manager)
[![downloads](http://img.shields.io/npm/dm/connection-manager.svg?style=flat)](https://npmjs.org/package/connection-manager)
[![release](http://img.shields.io/github/release/silverbucket/node-connection-manager.svg?style=flat)](https://github.com/silverbucket/node-connection-manager/releases)


Store and retreive active connections from multiple locations in your code-base, keep connection alive as long as there are references to it. One all references are lost, the connection is terminated using the provided callback.

This module was designed to be used in a situation where a single connection might need to be shared amongst several places in the code, and should be automatically destroyed once there are no more references.


```javascript
var xmpp_client = require('fake-xmpp-client');
var cm = require('connection-manager')('MY_APPS_CONNECTIONS', {
  id: 'unique_to_this_object_instance',
  foo: 'bar', // always added to the scope of the callbacks defined below
  hello: ['country', 'world', 'universe']
});

cm.create({
  id: 'irc://user@irc.freenode.net',  // unique identifier
  timeout: 10000,   // time to wait before cancelling the connect operation
  credentials: {    // used to connect & re-connect
    nick: 'user',
    host: 'irc.freenode.net'
  },
  connect: function (cb) {
    xmpp_client.on('connect', function (connection) {
      cb(null, connection);
    });

    xmpp_client.on('error', function (err) {
      cb(err);
    });

    // attempting to connect...
    xmpp_client.open(this.credentials);
  },
  listeners: {
    join: function (object) {
      // joined channel
      console.log(this.scope.hello); // ['country', 'world', 'universe']
    },
    leave: function (object) {
      // left channel
      console.log(this.scope.foo); // 'bar'
    }
  },
  addListener: function (name, func) {
    // for each listener defined, the addListener function 
    // is called during a connect or reconnect.
    this.connection.on(name, func);
  },
  removeListener: function (name, func) {
    // for each listener defined, the removeListener function 
    // is called during a connect or reconnect.
    this.connection.off(name, func);
  },
  disconnect: function (cb) {
    // disconnect the connection
    this.connection.close();
    cb();
  }
}, function (err, client) {
  if (err) {
    // error during connection object creation
  }
  // connection object has been created
  console.log('id: ' + client.id);  // 'irc://user@irc.freenode.net'
  
  // client.connection is the actual connection object returned 
  // during the `connect` call
  client.connection.send('this is a pretend message for a pretend connection');

  // the connection manager will keep a reference count for anyone who's
  // fetched the object
  console.log('references: ' + client.references);  // 1
});
```


Elsewhere in the code:

```javascript
var connectionManager = require('connection-manager');

var cm = connectionManager('MY_APPS_CONNECTIONS', {
  id: 'this_is_unique_to_this_object_instance_different_than_the_other',
  foo: { bar: 'baz' }, // always added to the scope of the callbacks for this instance 
  hello: 'goodbye'
});;

var credentials = {
  nick: 'user',
  host: 'irc.freenode.net'
};

var client = cm.get('irc://user@irc.freenode.net', credentials); // listeners for this scope are added with the above object

console.log('references: ' + client.references);  // 2

// if a `join` event happens, the listener callback will be called with the above scope
// so 'goodbye' will be printed


client.connection.send('this is another pretend message');
```
