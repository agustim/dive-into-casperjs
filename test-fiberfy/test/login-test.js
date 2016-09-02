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
casper.test.begin('Fiberfy login test', 5, function suite(test) {
    casper.start('http://localhost:3000', function() {
      test.assertTitle("", "fiberfy not homepage title, yet!");
    });

    casper.then(function(){
      test.assertExists("form[name=form-login] input[name='username']",
                        "username field exist.");
      test.assertExists("form[name=form-login] input[name='password']",
                        "password field exist.");

      this.fillSelectors("form[name=form-login]", {
          'input[name="username"]': 'demo',
          'input[name="password"]': 'NO_demo'
      }, true);
      casper.waitForSelectorTextChange('#message', function() {
        test.assertSelectorHasText('#message', 'Please enter right password!');
      });
    });

    casper.then(function(){
      this.fill("form[name=form-login]", {
          'username': 'demo',
          'password': 'demo'
      }, true);
    });

    casper.then(function(){
      this.wait(500, function() {
        test.assertUrlMatch(/map/, "Login correct!");
      })

    });
    casper.run(function() {
        test.done();
    });

});
