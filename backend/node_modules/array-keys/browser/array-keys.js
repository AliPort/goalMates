(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ArrayKeys = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * array-keys
 *   version 2.3.1
 *   http://github.com/silverbucket/array-keys
 *
 * Developed and Maintained by:
 *   Nick Jennings <nick@silverbucket.net> copyright 2015
 *
 * array-keys is released under the MIT license (see LICENSE).
 *
 * You don't have to do anything special to choose one license or the other
 * and you don't have to notify anyone which license you are using.
 * Please see the corresponding license file for details of these licenses.
 * You are free to use, modify and distribute this software, but all copyright
 * information must remain.
 *
 */

var TinyEmitter = require('tiny-emitter');

function ArrayKeys(p) {
  if (typeof p !== 'object') { p = {}; }
  this._identifier = p.identifier || 'id';
  this._store = [];
  this._idx = []; // array of identifier strings for quick lookup
  if (p.emitEvents) {
    this._emitEvents = true;
    this.events = new TinyEmitter();
  } else {
    this._emitEvents = false;
  }
}

ArrayKeys.prototype.emitEvent = function (event, data, dontEmit) {
  if ((this._emitEvents) && (! dontEmit)) {
    this.events.emit(event, data);
  }
};

ArrayKeys.prototype.getIdentifiers = function () {
  var ids = [];
  for (var i = this._store.length - 1; i >= 0; i = i - 1) {
    ids[ids.length] = this._store[i][this._identifier];
  }
  return ids;
};

ArrayKeys.prototype.getRecord = function (id) {
  for (var i = this._store.length - 1; i >= 0; i = i - 1) {
    if (this._store[i][this._identifier] === id) {
      return this._store[i];
    }
  }
  return undefined;
};

ArrayKeys.prototype.exists = function (id) {
  if (this.getIndex(id) >= 0) {
    return true;
  } else {
    return false;
  }
};

// faster than using indexOf
ArrayKeys.prototype.getIndex = function (id) {
  for (var i = this._idx.length - 1; i >= 0; i = i - 1) {
    if (this._idx[i] === id) {
      return i;
    }
  }
  return -1;
};

ArrayKeys.prototype.addRecord = function (record) {
  if (typeof record !== 'object') {
    throw new Error('cannot add non-object records.');
  } else if (!record[this._identifier]) {
    throw new Error('cannot add a record with no `' + this._identifier +
                    '` property specified.');
  }

  var removed = this.removeRecord(record[this._identifier], true);
  this._idx[this._idx.length] = record[this._identifier];
  this._store[this._store.length] = record;
  setTimeout(function () {
    if (removed) {
      setTimeout(this.emitEvent.bind(this, 'update', record), 0);
    } else {
      setTimeout(this.emitEvent.bind(this, 'add', record), 0);
    }
  }.bind(this), 0);
  return true;
};

ArrayKeys.prototype.removeRecord = function (id, dontEmit) {
  var idx  = this.getIndex(id);
  if (idx < 0) {
    return false;
  }

  // start looking for the record at the same point as the idx entry
  for (var i = idx; i >= 0; i = i - 1) {
    if ((this._store[i]) && (this._store[i][this._identifier] === id)) {
      this._store.splice(i, 1);
      this._idx.splice(idx, 1);
      setTimeout(this.emitEvent.bind(this, 'remove', id, dontEmit), 0);
      return true;
    }
  }

  // if it was not found, start at the end and break at the idx number
  for (var n = this._store.length - 1; n >= idx; n = n - 1) {
    if ((this._store[n]) && (this._store[n][this._identifier] === id)) {
      this._store.splice(n, 1);
      this._idx.splice(idx, 1);
      setTimeout(this.emitEvent.bind(this, 'remove', id, dontEmit), 0);
      return true;
    }
  }
  return false;
};

ArrayKeys.prototype.forEachRecord = function (cb) {
  var count = 0;
  var self = this;
  var finished = function () {};

  setTimeout(function () {
    for (var i = self._store.length - 1; i >= 0; i = i - 1) {
      count += 1;
      setTimeout(cb.bind(null, self._store[i], i), 0);
    }
    setTimeout(finished.bind(null, count), 0);
  }, 0);

  return {
    finally: function (func) {
      finished = func;
    }
  };
};

ArrayKeys.prototype.mapRecords = function(cb) {
  var count = 0;
  var self = this;
  var map = [];
  for (var i = self._store.length - 1; i >= 0; i = i - 1) {
    count += 1;
    map.push(cb(self._store[i], i));
  }
  return map;
};

ArrayKeys.prototype.getCount = function () {
  return this._store.length;
};

ArrayKeys.prototype.removeAll = function () {
  for (var i = this._store.length - 1; i >= 0; i = i - 1) {
    delete this._store[i];
  }
  this._store = [];
};

module.exports = ArrayKeys;

},{"tiny-emitter":2}],2:[function(require,module,exports){
function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;

},{}]},{},[1])(1)
});