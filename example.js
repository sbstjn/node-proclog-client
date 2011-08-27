var Log = require('./remotelogger.js').setServer('127.0.0.1:7111').andApplication('0x3');

for (var i = 0; i < 2; i++) {
  Log.fire('example', 'simple', 'iteration', i);
}

for (var i = 0; i < 10; i++) {
  Log.start('example', 'process', 'start', i, function(err, proc) {
    for (var j = 1; j < 2; j++) {
      Log.fire(proc, 'category', 'action', 'label', j);
    }
    Log.stop(proc);  
  });
}