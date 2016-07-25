// googletesting.js
casper.test.begin('Google search retrieves 10 or more results', 5, function suite(test) {
    casper.start("http://www.google.fr/", function() {
        test.assertTitle("Google", "google homepage title is the one expected");
        test.assertExists('form[action="/search"]', "main form is found");
        this.fill('form[action="/search"]', {
            q: "fiberfy"
        }, true);
    });

    casper.then(function() {
        console.log(casper.getTitle());
        test.assertTitle("fiberfy - Recherche Google", "google title is ok");
        test.assertUrlMatch(/q=fiberfy/, "search term has been submitted");
        test.assertEval(function() {
            return __utils__.findAll("h3.r").length >= 10;
        }, "google search for \"fiberfy\" retrieves 10 or more results");
    });

    casper.run(function() {
        test.done();
    });
});
