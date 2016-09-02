casper.options.viewportSize = {
    width: 1920,
    height: 987
};
casper.on('page.error', function(msg, trace) {
    this.echo('Error: ' + msg, 'ERROR');
    for (var i = 0; i < trace.length; i++) {
        var step = trace[i];
        this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
    }
});
casper.test.begin('Fiberfy project test', 2, function suite(test) {
    casper.start('http://localhost:3000/');

    casper.then(function(){
      test.assertTitle("", "fiberfy not homepage title, yet!");
      this.waitForSelector("form[name=form-login]", function() {
        this.fillSelectors("form[name=form-login]", {
            'input[name="username"]': 'demo',
            'input[name="password"]': 'demo'
        }, true);
      });
      this.waitForUrl(/map$/, function() {
        test.pass("Login")
      });
    });

    casper.run(function() {
        test.done();
    });

});
