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

casper.test.begin('Fiberfy project test', 3, function suite(test) {
    //var projectName = "demo"+Math.floor(Math.random()*1000);
    var projectName = "demo1010";

    casper.start('http://localhost:3000/');

    casper.then(function(){
      this.waitForSelector("form[name=form-login]", function() {
        this.fillSelectors("form[name=form-login]", {
            'input[name="username"]': 'demo',
            'input[name="password"]': 'demo'
        }, true);
      });
      this.waitForUrl(/map$/, function() {
        test.pass("Login")
      });
      this.waitForSelector("a#projects_manager");
    });

    casper.then(function(){
      this.mouse.click("a#projects_manager");
      test.assertVisible("#form-project-group","View project page.")
    });

    casper.then(function(){
      this.fillSelectors("div#form-project-group", {
        'input[name=project-name]': projectName
      }, false);

      var projectItemsBefore = this.evaluate(function(){
        return(__utils__.findAll('.project-item'))
      });
      this.log(projectItemsBefore,'warning');

      this.mouse.click('button#project-add');

      casper.waitFor(function check() {
          return this.evaluate(function() {
              return document.querySelectorAll('.project-item').length > projectItemsBefore;
          });
        }, function then(){
          test.pass("Create project.");
        });
      });
    })

    casper.then(function(){

    })


    casper.run(function() {
        test.done();
    });

});
