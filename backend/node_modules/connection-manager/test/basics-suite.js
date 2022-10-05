if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['require'], function (require) {
  var suites = [];

  suites.push({
    name: "ConnectionManager tests",
    desc: "initialize and test the results of the ConnectionManager singleton",
    abortOnFail: true,
    setup: function(env, test) {
      env.platform = 'test';
      var connectionManager = require('./../index');
      env.namespace1 = 'namespace1';
      env.namespace2 = 'namespace2';

      env.callbacks = {
        'test-client': {
          disconnect: 0
        },
        'test-client2': {
          disconnect: 1
        }
      };

      env.cm1 = connectionManager(env.namespace1, {
        id: 'cm1',
        foo: 'bar cm1'
      });

      env.cm2 = connectionManager(env.namespace1, {
        id: 'cm2',
        foo: 'bar cm2'
      });

      env.cm3 = connectionManager(env.namespace1, {
        id: 'cm3',
        foo: 'bar cm3'
      });

      env.cm4 = connectionManager(env.namespace2, {
        id: 'cm4',
        foo: 'bar cm4'
      });

      test.assertType(env.cm3, 'object');
    },

    tests: [
      {
        desc: 'get something that doesnt exist',
        run: function (env, test) {
          test.assert(env.cm1.get('test-client'), undefined);
        }
      },

      {
        desc: '#__getScope',
        run: function (env, test) {
          test.assertTypeAnd(env.cm2.__getScope, 'function');
          var scope = env.cm2.__getScope();
          var exp = {
            id: 'cm2',
            foo: 'bar cm2'
          };
          test.assert(scope, exp);
        }
      },

      {
        desc: '# referenceCount 0',
        run: function (env, test) {
          test.assert(env.cm2.referenceCount('test-client'), 0);
        }
      },

      {
        desc: '# create a client [test-client]',
        run: function (env, test) {
          var checklist = {
            connect: false,
            disconnect: false,
            listenersConnected: false,
            listenersDisconnected: false,
            listenersStar: false
          };

          env.credentials = {
            'test-client': {
              hello: 'world'
            }
          };

          env.cm1.create({
            id: 'test-client',
            credentials: env.credentials['test-client'],
            listeners: {
              '*': function (obj) {
                this.scope.star = true;
                checklist.listenersStar = true;
                test.assertAnd(this.connection.myConnectionObject, true);
              },
              connected: function (obj) {
                this.scope.connected = true;
                checklist.listenersConnected = true;
                test.assertAnd(this.connection.myConnectionObject, true);
              },
              disconnected: function (obj) {
                this.scope.disconnected = true;
                checklist.listenersDisconnected = true;
                env.callbacks['test-client'].disconnect += 1;
                test.assertAnd(this.connection.myConnectionObject, true);
              }
            },
            connect: function (cb) {
              checklist.connect = true;
              test.assertAnd(this.scope.foo, 'bar cm1');

              var events = require('events');

              var connectObj = {
                myConnectionObject: true,
                emitter: new events.EventEmitter()
              };
              cb(null, connectObj);
            },
            addListener: function (name, func) {
              this.connection.emitter.on(name, func);
            },
            removeListener: function (name, funcName) {
              this.connection.emitter.on(name, func);
            },
            disconnect: function (cb) { cb(null); }
          }, function (err, client) {
            if (err) {
              test.result(false, err);
            } else {
              test.assertTypeAnd(client.connection, 'object');

              client.connection.emitter.emit('connected', {hello:'world'});
              client.connection.emitter.emit('disconnected', {hello:'world'});
              client.connection.emitter.emit('*', {hello:'world'});

              test.assert(checklist, {
                connect: true,
                disconnect: false,
                listenersConnected: true,
                listenersDisconnected: true,
                listenersStar: true
              });
            }
          });
        }
      },

      {
        desc: '# referenceCount 1 [test-client]',
        run: function (env, test) {
            test.assert(env.cm2.referenceCount('test-client'), 1);
        }
      },

      {
        desc: '# __getScope [test-client]',
        run: function (env, test) {
          var scope = env.cm1.__getScope();
            test.assert(scope.foo, 'bar cm1');
        }
      },

      {
        desc: '# referenceCount 1 [test-client]',
        run: function (env, test) {
          test.assert(env.cm4.referenceCount('test-client'), 0);
        }
      },

      {
        desc: '# get [test-client]',
        run: function (env, test) {
          var client = env.cm4.get('test-client', env.credentials['test-client']);
          test.assertType(client, 'undefined');
        }
      },

      {
        desc: '# referenceCount 1 [test-client]',
        run: function (env, test) {
          test.assert(env.cm4.referenceCount('test-client'), 0);
        }
      },

      {
        desc: '# referenceCount 1 [test-client]',
        run: function (env, test) {
          test.assert(env.cm1.referenceCount('test-client'), 1);
        }
      },

      {
        desc: '# get [test-client]',
        run: function (env, test) {
          var client = env.cm2.get('test-client', env.credentials['test-client']);
          // console.log('client: ', client);
          test.assertType(client, 'object');
        }
      },

      {
        desc: '# referenceCount 2 [test-client]',
        run: function (env, test) {
          test.assert(env.cm3.referenceCount('test-client'), 2);
        }
      },

      {
        desc: '# get without creds [test-client]',
        run: function (env, test) {
          var client = env.cm1.get('test-client', {});
          test.assert(client, false);
        }
      },

      {
        desc: '# get non-existant client name',
        run: function (env, test) {
          var client = env.cm1.get('badclientname', {});
          test.assert(client, undefined);
        }
      },

      {
        desc: '# get [test-client]',
        run: function (env, test) {
          test.assertType(env.cm3.get('test-client', env.credentials['test-client']), 'object');
        }
      },

      {
        desc: '# referenceCount 2 [test-client]',
        run: function (env, test) {
          test.assert(env.cm1.referenceCount('test-client'), 3);
        }
      },

      {
        desc: '# move [test-client -> test-renamed]',
        run: function (env, test) {
          test.assert(env.cm1.move(
            'test-client', env.credentials['test-client'],
            'test-renamed', env.credentials['test-client']
          ), true);
        }
      },

      {
        desc: '# referenceCount 2 [test-renamed]',
        run: function (env, test) {
          test.assert(env.cm1.referenceCount('test-renamed'), 3);
        }
      },

      {
        desc: '# get [test-client] should fail',
        run: function (env, test) {
          test.assert(env.cm1.get('test-client', env.credentials['test-client']), undefined);
        }
      },

      {
        desc: '# create a client [test-client2]',
        run: function (env, test) {
          var checklist = {
            connect: false,
            disconnecte: false,
            listenersConnected: false,
            listenersDisconnected: false
          };

          env.credentials = {
            'test-client2': {
              foo: 'bar'
            }
          };

          env.cm2.create({
            id: 'test-client2',
            credentials: env.credentials['test-client2'],
            listeners: {
              connected: function (obj) {
                this.scope.connected = true;
                checklist.listenersConnected = true;
                test.assertAnd(this.connection.myConnectionObject, true);
              },
              disconnected: function (obj) {
                this.scope.disconnected = true;
                checklist.listenersDisconnected = true;
                env.callbacks['test-client2'].disconnect += 1;
                test.assertAnd(this.connection.myConnectionObject, true);
              }
            },
            connect: function (cb) {
              checklist.connect = true;
              test.assertAnd(this.scope.foo, 'bar cm2');

              var connectObj = {
                myConnectionObject: true
              };
              cb(null, connectObj);
            },
            addListener: function () {},
            removeListener: function () {},
            disconnect: function (cb) { cb(null); }
          }, function (err, client) {
            if (err) { test.result(false, err); }
            else {
              test.assertAnd(client.references._idx[0], 'cm2');
              test.assertType(client.connection, 'object');
            }
          });
        }
      },

      {
        desc: '# referenceCount 1 [test-client2]',
        run: function (env, test) {
          test.assert(env.cm1.referenceCount('test-client2'), 1);
        }
      },

      {
        desc: '# get cm1 [test-client2]',
        run: function (env, test) {
          test.assertType(env.cm1.get('test-client2', env.credentials['test-client2']), 'object');
        }
      },

      {
        desc: '# referenceCount 2 [test-client2]',
        run: function (env, test) {
          test.assert(env.cm3.referenceCount('test-client2'), 2);
        }
      },

      {
        desc: '# get cm1 [test-client2]',
        run: function (env, test) {
          env.testClient2 = env.cm1.get('test-client2', env.credentials['test-client2']);
          test.assertTypeAnd(env.testClient2, 'object');
          test.assert(env.testClient2.references._idx.sort(), ['cm1', 'cm2'].sort());
        }
      },

      {
        desc: '# referenceCount 2 [test-client2]',
        run: function (env, test) {
          test.assert(env.cm3.referenceCount('test-client2'), 2);
        }
      },

      {
        desc: '# remove one listener [test-client2]',
        run: function (env, test) {
          env.cm1.remove('test-client2');
          test.result(true);
        }
      },

      {
        desc: '# get cm1 [test-client2]',
        run: function (env, test) {
          test.assert(env.testClient2.references._idx.sort(), ['cm2'].sort());
        }
      },

      {
        desc: '# referenceCount 1 [test-client2]',
        run: function (env, test) {
          test.assert(env.cm1.referenceCount('test-client2'), 1);
        }
      },

      {
        desc: '# remove another listener [test-client2]',
        run: function (env, test) {
          env.cm2.remove('test-client2');
          test.result(true);
        }
      },

      {
        desc: '# referenceCount 2 [test-client2]',
        run: function (env, test) {
            test.assert(env.cm3.referenceCount('test-client2'), 0);
        }
      },

      {
        desc: '# wait 20secs for clear',
        timeout: 30000,
        run: function (env, test) {
          setTimeout(function () {
            test.assertAnd(env.cm1.get('test-client2', env.credentials['test-client2']), undefined);
            test.assert(env.callbacks['test-client2'].disconnect, 1);
          }, 21000);
        }
      },

      {
        desc: '# try getOrCreate on a known non-existant record',
        run: function (env, test) {
          var checklist = {
            connect: false,
            disconnecte: false,
            listenersConnected: false,
            listenersDisconnected: false
          };
          test.assertType(env.cm1.getOrCreate('test-client2', {
              id: 'test-client2',
              credentials: env.credentials['test-client2'],
              listeners: {
                connected: function (obj) {
                  this.scope.connected = true;
                  checklist.listenersConnected = true;
                  test.assertAnd(this.connection.myConnectionObject, true);
                },
                disconnected: function (obj) {
                  this.scope.disconnected = true;
                  checklist.listenersDisconnected = true;
                  env.callbacks['test-client2'].disconnect += 1;
                  test.assertAnd(this.connection.myConnectionObject, true);
                }
              },
              connect: function (cb) {
                checklist.connect = true;
                test.assertAnd(this.scope.foo, 'bar cm1');

                var connectObj = {
                  myConnectionObject: true
                };
                cb(null, connectObj);
              },
              addListener: function () {},
              removeListener: function () {},
              disconnect: function (cb) { cb(null); }
            }, function (err, client) {
              if (err) { test.result(false, err); }
              else {
                test.assertAnd(client.references._idx[0], 'cm1');
                test.assertType(client.connection, 'object');
              }
            }), 'object');
        }
      }

    ]

  });

  return suites;
});
