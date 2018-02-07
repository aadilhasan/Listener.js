(function(global, factory) {
  typeof exports === "object" && module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
      ? define(factory())
      : (global.Listener = factory());
})(this, function() {
  /**
   * listener constructor function
   *
   */

  const Listener = function() {
    this.listeners = {};
    this.silent = false;
  };

  /**
   * default options for On function
   *
   */
  const defaultOnOptions = {
    callOnce: false,
    callCount: 0,
    callLimit: 0
  };

  const defaultEmitOptions = {
    removeAfter: false
  };

  const noop = function() {};

  Listener.prototype.warn = function(message) {
    console.error(message);
  };

  Listener.prototype.tips = function(message) {
    console.warn(message);
  };

  /**
   * add event data to Listeners object
   *
   * @param {string} name
   * @param {function} cb
   * @param {object} options
   *
   */

  Listener.prototype.on = function(name, cb, options) {
    if (name === undefined) {
      this.warn(
        `Listner.on: takes "name" for event, as first argument, and it is requied`
      );
      return;
    }

    if (cb === undefined || typeof cb !== "function") {
      this.warn(
        `Listner.on: takes a "callback function" as second argument, and it is requied`
      );
      return;
    }

    //    let newOptions =  {...defaultOnOptions, ...options};
    let newOptions = Object.assign(defaultOnOptions, options);

    this.listeners[name] = {
      __name: name,
      __cb: cb || noop,
      __options: newOptions
    };
  };

  /**
   * call a event listener callback using its name from Listeners object
   *
   * @param {string} name
   * @param {object} data
   * @param {context} ctx
   * @param {object} options
   *
   */

  Listener.prototype.emit = function(name, data = {}, ctx, options) {
    if (name === undefined) {
      this.warn(
        `Listner.emit: takes "event listener name" as first argument, and it is requied`
      );
      return;
    }

    //    let emitOptions = {...defaultEmitOptions, ...options}
    let emitOptions = Object.assign(defaultEmitOptions, options);
    let listener = this.listeners[name];

    if (typeof listener !== "undefined") {
      let listenerOptions = listener.__options;

      if (
        (listenerOptions.callOnce === true && listenerOptions.callCount > 0) ||
        (listenerOptions.callLimit > 0 &&
          listenerOptions.callCount >= listener.callLimit)
      ) {
        this.remove(name);
        return;
      }

      if (emitOptions.removeAfter === true) {
        this.remove(name);
      } else {
        this.listeners[name].__options.callCount += 1;
      }

      ctx !== undefined && ctx !== null
        ? listener.__cb.call(ctx, data)
        : listener.__cb(data);
    }
  };

  /**
   * remove listener using its name from Listeners object
   *
   * @param {string} name
   *
   */

  Listener.prototype.remove = function(name) {
    if (name === undefined) {
      this.warn(
        `Listner.remove: takes "event listener name" as first argument, and it is requied`
      );
      return;
    }

    let listener = this.listeners[name];

    if (typeof listener !== "undefined") {
      delete this.listeners[name];
    }
  };

  /**
   * call a event using its name from Listeners object
   *
   * @param {array} listenerArray <string/object>
   * @param {object} data
   * @param {context} ctx
   * @param {object} options
   *
   */

  Listener.prototype.broadcast = function(
    listenerArray,
    data = {},
    ctx,
    options
  ) {
    if (!Array.isArray(listenerArray)) {
      this.warn(
        `Listner.broadcast: takes "event listener array" as first argument, and it is requied`
      );
      return;
    }

    let len = listenerArray.length;

    for (let i = 0; i < len; i++) {
      let item = listenerArray[i];

      if (typeof item === "string") {
        setTimeout(() => {
          this.emit(item, data, ctx, options);
        }, 0);
      } else if (Array.isArray(item) == false && typeof item === "object") {
        setTimeout(() => {
          this.emit(
            item.eventName,
            item.data || data,
            item.context || ctx,
            item.options || options
          );
        }, 0);
      } else {
        this.warn(
          `Listner.broadcast: event listeners array items no ${i} is of type ${
            Array.isArray(item) ? "Array " : typeof item
          }, make sure array items are of string/object type`
        );
      }
    }
  };

  return new Listener();
});
