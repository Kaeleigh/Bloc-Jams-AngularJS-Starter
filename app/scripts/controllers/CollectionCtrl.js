(function() {
    function CollectionCtrl() {
        this.albums = [];
        for (var i=0; i < 12; i++) {
            this.albums.push(angular.copy(albumPicasso));   // adds copy of albums to the empty array
        }
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();
