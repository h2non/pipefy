var Buffer = require('buffer').Buffer
var Writable = require('stream').Writable
var slice = Array.prototype.slice

module.exports = pipefy

function pipefy(cb) {
  var stream = new Stream
  var args = slice.call(arguments, 1)

  stream.once('finish', function () {
    cb.apply(null, [ stream._buffer ].concat(args))
  })

  return stream
}

function Stream() {
  Writable.call(this)
  this._chunks = []
  this._length = 0
}

Stream.prototype = Object.create(Writable.prototype)

Stream.prototype._write = function (chunk, enc, next) {
  this._length += chunk.length
  this._chunks.push(chunk)
  next()
}

Object.defineProperty(Stream.prototype, '_buffer', {
  get: function () {
    return Buffer.concat(this._chunks, this._length)
  }
})

pipefy.Stream = Stream