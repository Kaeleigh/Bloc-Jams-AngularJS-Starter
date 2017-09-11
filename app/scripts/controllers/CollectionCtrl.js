(function() {
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getcollection(12);
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();
