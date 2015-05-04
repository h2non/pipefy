# pipefy [![Build Status](https://travis-ci.org/h2non/pipefy.svg?branch=master)](https://travis-ci.org/h2non/pipefy)

Simple and dependency-free node/io.js module to transform a function into a pipeable stream

pipefy returns a unique buffer as result of contatenating each chunks of the readable input stream.
This is usually enough for most cases, but for large amounts of data it may have negative performance side-effects.

## Installation

```
npm install pipefy --save
```

## Example

```js
var fs = require('fs')
var pipefy = require('pipefy')
```

Instead of doing this (note that I've used the sync API for simplification):
```js
function process(buf, path) {
  // mad science here...
  fs.writeFileSync(path, buf)
}

var data = fs.readFileSync('image.jpg')
process(data, 'new.jpg')
```

With `pipefy` you can do the same in a more idiomatic and efficient way:
```js
function process(buf, path) {
  // mad science here...
  fs.writeFileSync(path, buf)
}

fs.createReadStream('image.jpg')
  .pipe(pipefy(process, 'new.jpg'))
```

## API

#### pipefy(fn, [ args... ])

Returns a [WritableStream](https://nodejs.org/api/stream.html#stream_class_stream_writable)

You can subscribe to stream events to deal with the status. E.g: `error`, `finish` ...

#### pipefy.Stream()

Writable stream implementation used internally by `pipefy`

See the [implementation](https://github.com/h2non/pipefy/blob/master/index.js#L18) for hacking purposes

## License

MIT - Tomas Aparicio
