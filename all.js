global.Promise = require('bluebird');
var co = require('co');
var ffi = require('ffi');
var rust = ffi.Library('libprocess',{
  process: ['void',[]] // arg,ret
});

function Thread(fn) {
  return co(function * () {
    return fn();
  });
}

function process() {
  var ret = 0;
  for (var i = 0; i < 100000000; i++) {
    ret++;
  }
  return ret;
}

co(function * () {
  console.time('process 10 times');

  // promises
  var ps = [];
  for (var i = 0; i < 10; i++) {
    ps.push(new Thread(process));
  }

  // results
  var vals = yield ps;
  console.log(vals);
  console.timeEnd('process 10 times');

  // 用rust
  console.time('with rust');
  rust.process();
  console.timeEnd('with rust');
});