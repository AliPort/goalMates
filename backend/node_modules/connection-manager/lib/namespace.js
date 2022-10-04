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

var ArrayKeys  = require('array-keys'),
    Manager    = require('./manager.js');

/*
 * Wrapper: CMScope
 *
 * the CMScope object is essentially a wrapper for the ConnectionManager to
 * protect persistent information from other platforms. So a platform cannot
 * hijack another platforms client instance (an xmpp connection, for example)
 *
 * it curries all the functions of the ConnectionManager singleton with platform
 * and sessionId, making the interface very simple for the platform user.
 *
 * Parameters:
 *
 *   scope  - scope object
 *
 * Returns:
 *
 *   CMScope object
 */
function CMScope(manager, scope) {
  function o () {}

  o.prototype.create = function (obj, cb) {
    return manager.create.call(manager, scope, obj, cb);
  };

  o.prototype.remove = function (id) {
    return manager.remove.call(manager, scope, id);
  };

  o.prototype.removeAll = function () {
    var keys = manager.getKeys.call(manager);
    for (var i = 0, len = keys.length; i < len; i++) {
      manager.remove.call(manager, scope, keys[i]);
    }
  };

  o.prototype.get = function (id, creds) {
    return manager.get.call(manager, scope, id, creds);
  };

  o.prototype.getOrCreate = function (id, obj, cb) {
    var client = manager.get.call(manager, scope, id, obj.credentials);
    if (! client) {
      manager.create.call(manager, scope, obj, cb);
    }
  };

  o.prototype.move = function (oldID, oldcreds, newID, newcreds) {
    return manager.move.call(manager, scope, oldID, oldcreds, newID, newcreds);
  };

  o.prototype.exists = function (id) {
    return manager.exists.call(manager, id);
  };

  o.prototype.referenceCount = function (id) {
    return manager.referenceCount.call(manager, id);
  };

  o.prototype.getKeys = function () {
    return manager.getKeys.call(manager);
  };

  o.prototype.removeListeners = function (id) {
    return manager.removeListeners.call(manager, scope, id);
  };

  o.prototype.__getScope = function () { return scope; };

  return new o();
}


module.exports = function (namespace) {

  var manager  = new Manager(namespace);

  var scopes = new ArrayKeys({
    identifier: 'id'
  });

  return {
    namespace: namespace,
    getManager: function (scope) {
      var scopedManager = scopes.getRecord(scope.id);
      if (! scopedManager) {
        scopedManager = {
          id: scope.id,
          object: CMScope(manager, scope)
        };
        scopes.addRecord(scopedManager);
      }

      return scopedManager.object;
    }
  };
};
