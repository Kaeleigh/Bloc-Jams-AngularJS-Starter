(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;     // makes service accessible within Album view
    }

    angular
      .module('blocJams')
      .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
