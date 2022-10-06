/**
 * copyright 2012 Nick Jennings (https://github.com/silverbucket)
 *
 * node-connection-manager is licensed under the MIT license.
 * See the LICENSE file for details.
 *
 * The latest version of node-connection-manager can be found here:
 *   git://github.com/silverbucket/node-connection-manager.git
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */

var objectAssert = require('object-assert'),
    ArrayKeys    = require('array-keys'),
    debug        = require('debug')('connection-manager');

var reportingActive = false;

/**
 * Class: ConnectionManager
 *
 * The singleton object responsible for keeping a connection session alive for
 * retreival for anything claiming the same namespace. Tracking references, etc.
 *
 */
function ConnectionManager(namespace) {
  this.namespace = namespace;
  this.clients = new ArrayKeys({
    identifier: 'id'
  });

  var reconnecting = false;
  var self = this;

  if (! reportingActive) {
    reportingActive = true;

    setInterval(function __report() {
      self.clients.forEachRecord(function (client) {
        var count = client.references.getCount();

        if ((count > 0) && ((typeof client.isConnected !== 'function') || (! client.isConnected())) && (! reconnecting)) {
          debug('client ' + client.id + ' is disconnected, but reference count: ' + count + ', reconnecting...');

          var scopes   = client.references.getIdentifiers();
          var scope    = client.references.getRecord(scopes[0]);
          reconnecting = true;

          client.connect.call(buildScope(scope, client), function (err, c) {
            if (err) {
              debug('failed reconnecting: ', err);
              throw new Error(err);
            }
            debug('client successfully reconnected.');
            client.connection = c;
            client = registerListeners(scope, client);
            reconnecting = false;
          });

          for (var i = 1, len = scopes.length; i < len; i++) {
            client = registerListeners(client.references.getRecord(scopes[i]), client);
          }
        }
      });
    }, 60000);
  }
}

function buildScope(scope, client) {
  return {
    id: client.id,
    credentials: client.credentials,
    connection: client.connection,
    scope: scope
  };
}

function registerListeners(scope, client) {

  function listenerWrapper(listener) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      listener.apply(buildScope(scope, client), args);
    };
  }

  var keys = Object.keys(client.listeners);
  for (var i = 0, len = keys.length; i < len; i += 1) {
    debug('processing listener: ' + keys[i]);
    // wrapper for listener callbacks
    if (typeof client.indexedListeners[keys[i]] === 'undefined') {
      client.indexedListeners[keys[i]] = {}; // TODO use ArrayKey
    } else if (typeof client.indexedListeners[keys[i]][client.id + '__' + scope.id] !== 'undefined') {
      // scope already registered listeners
      continue;
    }

    // new scope, register listeners for it
    client.indexedListeners[keys[i]][client.id + '__' + scope.id] = listenerWrapper(client.listeners[keys[i]]);

    try {
      client.addListener.apply(buildScope(scope, client), [keys[i], client.indexedListeners[keys[i]][client.id + '__' + scope.id]]);
    } catch (e) {
      throw new Error(e);
    }
  }

  return client;
}

/**
 * Function: removeListeners
 *
 * given an ID, removes all listeners from a connection object.
 *
 * Parameters:
 *
 *   id - unique name to lookup client
 *
 */
ConnectionManager.prototype.removeListeners = function (scope, id) {
  if (! id) {
    throw new Error('removeListeners() requires an ID paramater');
  }

  var client = this.clients.getRecord(id);
  if ((! client) || (typeof client.listeners !== 'object')) {
    return;
  }

  // if we have listeners for this session, we need to remove them
  var keys = Object.keys(client.indexedListeners);
  for (var i = 0, len = keys.length; i < len; i += 1) {

    var type = keys[i];
    var nkeys = Object.keys(client.indexedListeners[type]);
    for (var n = 0, nlen = nkeys.length; n < nlen; n += 1) {

      var listener = nkeys[n];
      if (typeof client.indexedListeners[type][listener] !== 'function') {
        throw new Error('why isnt [' + listener + '] a function ? [' +
                      typeof client.indexedListeners[type][listener] +
                      ']:', client.indexedListeners[type][listener]);
      } else {
        if (typeof client.removeListener !== 'function') {
          throw new Error('need a client.removeListener function');
        } else {
          debug('removing ' + type + ' event listeners');
          client.removeListener.apply(
              buildScope(scope, client),
              [
                listener,
                client.indexedListeners[type][listener]
              ]
          );
        }
      }
      delete client.indexedListeners[type][listener];
    }
  }
};

/*
 * Function: add (private)
 *
 * adds a client to the index based on key. incrementing the reference count
 * for already added clients.
 *
 * Parameters:
 *
 *   client - client object (from create)
 *
 */
ConnectionManager.prototype.add = function (scope, client) {
  // if (! this.clients.exists(client.id)) {
  if (! client.references) {
    client.references = new ArrayKeys({
      identifier: 'id'
    });
  }

  client.references.addRecord(scope);
  this.clients.addRecord(client);
};

/**
 * Function: create
 *
 * Manages the creation, listener registering, and removal of a client.
 *
 * Parameters:
 *
 *   o   - object containing a set of function callbacks for various states
 *         of the client.
 *   cb  - callback function when create is completed, params are:
 *         err (srting, client (object)
 *
 *  ---
 *
 *   o.id [string] - unique identifier of this client connection
 *
 *   o.timeout [number] - optionally specify the timeout in ms to abort the
 *                        connection attempt.
 *
 *   o.credentials [object]
 *         credential object to be used when issuing the connect
 *
 *   o.connect(cb) [function]
 *         called to establish a connection, should provide the the client
 *         connection object on cb.
 *
 *   o.listeners [object]
 *         an object of listeners, the property is the name of the listener,
 *         the value is a function to call when that listener event is fired.
 *
 *   o.addListener(name, func) [function]
 *         executed when the clientManager wants to add a listener (ie.
 *         during connect), the name/func pairs will be whatever you've
 *         described in the listeners(object).
 *
 *   o.removeListener(name, func) [function]
 *         called when the clientManager wants to remove a listener (ie.
 *         during a disconnect).
 *
 *   o.disconnect(cb) [function]
 *         called when the clientManager wants to completely destroy the
 *         connection.
 *
 */
ConnectionManager.prototype.create = function (scope, o, cb) {
  var self = this;

  if (typeof cb !== 'function') {
    throw new Error('create() callback not defined.');
  } else if (typeof o !== 'object') {
    return cb('connection manager requires a connection object');
  }

  if (typeof o.id !== 'string') {
    return cb('connection object must contain a `id` string property');
  } else if (typeof o.credentials !== 'object') {
    return cb('connection object must contain a `credentials` object property');
  } else if (typeof o.listeners !== 'object') {
    return cb('connection object must contain a `listeners` object property ['+typeof o.listeners+']');
  } else if (typeof o.addListener !== 'function') {
    return cb('connection object must contain a `addListener` function property');
  } else if (typeof o.removeListener !== 'function') {
    return cb('connection object must contain a `removeListener` function property');
  } else if (typeof o.disconnect !== 'function') {
    return cb('connection object must contain a `disconnect` function property');
  }

  o.timeout = (typeof o.timeout === 'number') ? o.timeout : 10000;

  var client = {
    id: o.id,
    credentials: o.credentials,
    connect: o.connect,
    listeners: o.listeners,
    indexedListeners: {},
    addListener: o.addListener,
    removeListener: o.removeListener,
    isConnected: o.isConnected || function () {
          debug('default isConnected function is being called, this. might cause dead connections to never reset.');
          return true;
    },
    disconnect: o.disconnect,
    connection: undefined
  };

  // call provided connect function
  var abort = false,
      connected = false;
  o.connect.call(buildScope(scope, client), function (err, c) {
    if (err) {
      // error with client connection
      debug('connect call failed: ' + err);
      return cb(err);
    } else if (abort) {
      client.connection = c;
      client.disconnect.call(buildScope(scope, client), function () {
        self.clients.removeRecord(client.id);
      });
      debug('skipping connect due to abort timeout.');
      return cb('skipping connect due to abort timeout.'); // abort, callback already called
    }
    connected = true;
    debug('connect call completed without error');
    client.connection = c;

    client = registerListeners(scope, client);

    self.add(scope, client);

    debug('calling callback');
    cb(null, client);
  });
  setTimeout(function () {
    if (! connected) {
      abort = true;
      cb('unable to connect, timeout [' + o.timeout + '] reached.');
    }
  }, o.timeout);
};

/**
 * Function: get
 *
 * Given an ID and credential object, the get function will send back an existing
 * client object if one was found under the given key name, and also if the
 * credential objects match.
 *
 * Parameters:
 *
 *   id       - unique name to lookup client
 *   credentials - credential object set by client for the session.
 *
 * Returns:
 *
 *   client object, undefined (no client found) or false (credentials don't match)
 */
ConnectionManager.prototype.get = function (scope, id, credentials) {
  var self = this;
  var client = self.clients.getRecord(id);

  if (! client) {
    debug('no record found with id: ' + id);
    return undefined;
  }

  if (! credentials) {
    credentials = {};
  }

  //
  // compare clients credentials with current sessions
  //
  if (objectAssert(credentials, client.credentials)) {
    //
    // credential match for client, return client object
    //
    client.references.addRecord(scope);
    // console.info('credentials match, returning existing client. count: ' +
    //              self.referenceCount(id));

    self.clients.addRecord(client);
    return registerListeners(scope, client);
  } else {
    // console.log('credentials do not match, rejecting');
    return false;
  }
};

/**
 * Function: remove
 *
 * removes the client completely if there are no more references, otherwise,
 * it decrements the reference count by 1
 *
 * there is a 20s delay for complete removal of the object, to account for
 * page refreshes.
 *
 * Parameters:
 *
 *   id - unique name to lookup client
 *
 */
ConnectionManager.prototype.remove = function (scope, id) {
  var client = this.clients.getRecord(id);
  if (! client) {
    debug('removal called on non-existant client: ' + id);
    return undefined;
  }

  debug('removing reference: ' + scope.id + ' from client ' + id);
  // first thing is we decrese the count by removing the session
  client.references.removeRecord(scope.id);

  if (this.referenceCount(id) <= 0) {
    debug('queuing client for possible disconnect.');
    var self = this;

    //
    // if the removal of our session reference brings the count to 0, then we
    // initiate the timeout for actual removal check
    //
    setTimeout(function () {
      if ((!self.clients.getRecord(id))) {
        debug('error: skipping duplicate removals, should not arrive here');
      } else if (self.referenceCount(id) <= 0) {
        // disconnect client
        try {
          debug('ending client ' + id);
          debug('references: ', client.references.getIdentifiers());
          client.disconnect.call(buildScope(scope, client), function () {
            self.clients.removeRecord(id);
          });
        } catch (e) {
          // We stop throwing errors now due to issue:
          // https://github.com/sockethub/sockethub/issues/205
          // and instead remove the reference, if it exists, and carry on.
          self.clients.removeRecord(id);
        }
      } else {
        // someone jumped on and grabbed this client
        debug('client \'' + id + '\' spoken for, aborting removal.');
      }
    }, 20000); // delay for 20s
  } else {
    debug('other references exist, keeping client alive.');
  }
};

/**
 * Function: move
 *
 * moves a client object from one key lookup to another, useful for cases
 * where the 'key' is a username that changes after the initial creation of
 * the client object
 *
 * Parameters:
 *
 *   oldID     - existing key to retreive the client object
 *   oldcreds  - credential object set by client for the session, (can be
 *               retreived within a platform with session.getConfig('credentials'))
 *   newID     - new key to move the client object to
 *   newcreds  - [optional] updated credential object, if not specified existing
 *               credentials will remain unchanged
 *
 * Returns:
 *
 *   boolean
 */
ConnectionManager.prototype.move = function (scope, oldID, oldcreds, newID, newcreds) {
  if ((!oldID) || (!newID) || (!oldcreds)) {
    throw new Error('move needs at least three parameters oldID, credentials, and newID');
    //return undefined;
  }

  var self = this;

  // make sure we can fetch client object with old creds
  var client = self.get(scope, oldID, oldcreds);

  if (! client) {
    debug('unable to move, no existing record found for ', oldID);
    return false;
  }

  var references  = client.references;
  var listeners   = client.listeners;
  var indexedListeners = client.indexedListeners;
  var addListener = client.addListener;
  var removeListener = client.removeListener;
  var isConnected = client.isConnected;
  var disconnect  = client.disconnect;

  var newClient = {
    id: newID,
    connection: client.connection,
    references: references,
    listeners: listeners,
    indexedListeners: indexedListeners,
    addListener: addListener,
    removeListener: removeListener,
    isConnected: isConnected,
    disconnect: disconnect,
  };

  if (newcreds) {
    newClient.credentials = newcreds;
  }

  this.clients.addRecord(newClient);

  this.clients.removeRecord(oldID);

  return true;
};

/**
 * Function: exists
 *
 * returns a boolean indicating whether or not the given ID exists
 *
 * Parameters:
 *
 *   id - unique name to lookup
 *
 * Returns:
 *
 *   boolean
 */
ConnectionManager.prototype.exists = function (id) {
  return this.clients.exists(id);
};

/**
 * Function: referenceCount
 *
 * returns number of refernences for a given ID
 *
 * Parameters:
 *
 *   id - unique id to get reference count on
 *
 * Returns:
 *
 *   number
 */
ConnectionManager.prototype.referenceCount = function (id) {
  var client = this.clients.getRecord(id);
  if (! client) {
    return 0;
  }
  return client.references.getCount();
};

/**
 * Function: getKeys
 *
 * returns all keys existing within the namespace
 *
 * Parameters:
 *
 *   none
 *
 * Returns:
 *
 *   array of strings
 */
ConnectionManager.prototype.getKeys = function () {
  return this.clients.getIdentifiers();
};


module.exports = ConnectionManager;