# Listener.js

It is small and light weight javascript event listener library for for client side js and node js.

## Uses

### Listener.on

on function is used to takes 3 arguments.

* event_name`<string>` **required**,
* callback `<function>` **required**,
* options `<object>` **optional**

#### callback

callback function receives a value passed into emit function.

#### options

###### callOnce (default value: false) `<boolean>` :

if true listener will be removed after one call.

###### callLimit (default value: 0) `<number>`:

if callLimit value is > 0 listener will be removed after it called callLimit value times.

```
Listener.on('userLoggedIn', function(data){

    ...do some stuff

}, {callOnce: true});
```

### Listener.emit

on function is used to emit an event, it takes 3 arguments.

* event_name`<string>` **required**,
* data `<any>` **optional**,
* context `<context>` **optional**,
* options `<object>` **optional**

#### context

user can pass a context in which they want the callback function to be executed.

#### data

data can be anything user wants to pass to the listener callback.

#### options

###### removeAfter (default value: false) `<boolean>` :

if true, the emitted listener will be removed after this.

```
Listener.emmit('userLoggedIn', {}, this, {removeAfter: true});
```

### Listener.broadcast

broadcast function is used to emit more then one event, it takes 3 arguments.

* events `<array>` **required**,
* default_data `<object>` **optional**,
* default_context `<context>` **optional**,
* default_options `<object>` **optional**

#### events

events is an array of strings/objects. value of each item can be a string or an object.

###### string value:

if array item is string the event will be emitted with the default_data, default_context and default_options (if any).

###### object value:

if array item is an object the event will be emitted with the data, context and options given to the object if not default passed value will be used (if any).

this object has 3 keys:

* eventName
* data
* context
* options

#### default_data

default data can be anything user wants to pass to every listener given in first argument array.

#### default_options

###### removeAfter (default value: false) `<boolean>` :

if true, the emitted listener will be removed after this.

```
Listener.broadcast(['userLoggedIn', 'userCreated', {eventName: 'showNotificatons', data: {}, options: {callLimit: 2}}, 'getUserData'], {}, this);
```
