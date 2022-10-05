function getTests() {
  return [
    {
      desc: '# status property exists',
      run: function (env, test) {
        test.assertType(env.mod.status, 'boolean');
      }
    },

    {
      desc: '# message property exists',
      run: function (env, test) {
        test.assertType(env.mod.message, 'string');
      }
    },

    {
      desc: '# bad object',
      run: function (env, test) {
        test.assert(env.mod({foo:'bar'}, {bad:'obj'}), false);
      }
    },

    {
      desc: '# bad object error message',
      run: function (env, test) {
        test.assertFail(env.mod.message.length, 0);
      }
    },

    {
      desc: '# good object',
      run: function (env, test) {
        test.assert(env.mod({foo:'bar',bad:'obj',this:true}, {foo:'bar',bad:'obj',this:true}), true);
      }
    },

    {
      desc: '# good complex object',
      run: function (env, test) {
        var co = {
          foo: 'bar',
          bad: 'obj',
          this: true,
          me: {
            o: {
              me: {
                o: [true, false, true, undefined, 'this', 'that', true, 9]
              }
            }
          }
        };
        var oco = JSON.stringify(co);
        oco = JSON.parse(oco);
        test.assert(env.mod(co, oco), true);
      }
    },

    {
      desc: '# bad complex object',
      run: function (env, test) {
        var co = {
          foo: 'bar',
          bad: 'obj',
          this: true,
          me: {
            o: {
              me: {
                o: [true, false, true, undefined, 'this', 'that', true, 9]
              }
            }
          }
        };
        var oco = JSON.stringify(co);
        oco = JSON.parse(oco);
        oco.bad = true;
        test.assert(env.mod(co, oco), false);
      }
    }
  ];
}

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define(['require'], function (require) {
  return [{
    desc: "basic tests",
    setup: function (env, test) {
      env.mod = require('./../index');
      test.assertType(env.mod, 'function');
    },
    tests: getTests(),
  },
  {
    desc: "basic tests (browserify)",
    setup: function (env, test) {
      env.mod = require('./../browser/object-assert.js');
      test.assertType(env.mod, 'function');
    },
    tests: getTests(),
  },
  {
    desc: "basic tests (browserify minified)",
    setup: function (env, test) {
      env.mod = require('./../browser/object-assert.min.js');
      test.assertType(env.mod, 'function');
    },
    tests: getTests(),
  }];
});
