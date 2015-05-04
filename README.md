# pipefy

Simple and dependency-free node/io.js module to transform a function into a pipeable stream

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
function save(buf, path) {
  // mad science here...
  fs.writeFileSync(path, buf)
}

var data = fs.readFileSync('image.jpg')
save(data, 'new.jpg')
```

With `pipefy` you can do the same in a more idiomatic and efficient way:
```js
function save(buf, path) {
  fs.writeFileSync(path, buf)
}

fs.createReadStream('image.jpg')
  .pipe(pipefy(save, 'new.jpg'))
```

## API

#### pipefy(fn, [ args... ])

Returns a [WritableStream](https://nodejs.org/api/stream.html#stream_class_stream_writable)

You can subscribe to stream events to deal with the status. E.g: `error`, `finish` ...

#### pipefy.Stream()

Writable stream implementation used internally by `pipefy`

## License

MIT - Tomas Aparicio
