var expect = require('chai').expect,
    pakr

describe('pakr', function() {
  it('should load', function(done) {
    pakr = require('..')
    done()
  })

  var expected = ["hello", "world"]
  var expectedString = JSON.stringify(expected)
  it('should eaual ' + expectedString, function(done) {
    var test = pakr(expected)
    var json = JSON.stringify(test)
    expect(json).to.equal(expectedString)
    done()
  })
})
