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
    Namespace  = require('./lib/namespace.js');

var namespaces = new ArrayKeys({
  identifier: 'namespace'
});

module.exports = function (namespace, scope) {
  if (typeof namespace !== 'string') {
    throw new Error('ConnectionManager called without valid namespace param (string)');
  }

  var ns = namespaces.getRecord(namespace);
  if (! ns) {
    ns = new Namespace(namespace);
    namespaces.addRecord(ns);
  }

  return ns.getManager(scope);
};
