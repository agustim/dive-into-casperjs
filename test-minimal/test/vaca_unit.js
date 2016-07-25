casper.test.begin('Vaca pot mugir', 2, function suite(test) {
    var vaca = new Vaca();
    test.assertEquals(vaca.diu(), 'muuu!');
    test.assert(vaca.mugeix);
    test.done();
});
