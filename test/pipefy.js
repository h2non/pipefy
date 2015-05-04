var fs = require('fs')
var stream = require('stream')
var Buffer = require('buffer').Buffer
var expect = require('chai').expect
var pipefy = require('../')

suite('pipefy', function () {

  test('file', function (done) {
    function assert(buffer) {
      expect(buffer).to.have.length(35498)
      done()
    }

    fs.createReadStream('test/fixtures/data.json')
      .pipe(pipefy(assert))
  })

  test('readable', function (done) {
    function assert(buffer) {
      expect(buffer).to.have.length(11)
      expect(buffer.toString()).to.be.equal('hello world')
      done()
    }

    var rs = new stream.Readable
    rs.push('hello ')
    rs.push('world')
    rs.push(null)

    rs.pipe(pipefy(assert))
  })

  test('partial arguments', function (done) {
    function assert(buffer, foo, bar) {
      expect(buffer).to.have.length(0)
      expect(foo).to.be.equal('foo')
      expect(bar).to.be.equal('bar')
      done()
    }

    var rs = new stream.Readable
    rs.push(null)
    rs.pipe(pipefy(assert, 'foo', 'bar'))
  })
  
})