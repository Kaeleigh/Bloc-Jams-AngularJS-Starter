/**
There are 2 private attribute (currentBuzzObject) and (currentAlbum)
Three private functions (setSong), (playSong), (getSongIndex)
Three public attributes (SongPlayer.play), (SongPlayer.pause) and SongPlayer.currentSong
*/

(function() {   // creates service that will play songs
    function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
/**
*@desc Current album variable
*@type {Object}
*/
         var currentAlbum = Fixtures.getAlbum();      // stores album info from Fixtures to varibale currentAlbum
/**
* @desc Buzz object audio file
* @type {Object}
*/
        var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playng song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
        var setSong = function(song) {
            if (currentBuzzObject) {          // if there is a song
                  stopSong();   //stop that song and updates boolean
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {   //creates new sound instance from music in assests
               formats: ['mp3'],
               preload: true
           });

           currentBuzzObject.bind('timeupdate', function() {                // timeupdate a html5 audio event used with Buzz bind method 
              $rootScope.$apply(function() {
                 SongPlayer.currentTime = currentBuzzObject.getTime();
              });
           });

           SongPlayer.currentSong = song;    // sets chosen song as current song
        };  // closes setSong function

/**
* @function playSong
* @desc Plays current song
* @param {Object} song
*/
          var playSong = function(song) {

                  currentBuzzObject.play();     //buzz play method on SongPlayer object; plays new buzz sound object
                  song.playing = true;          // updates boolean of selected song
              };  // closes playSong function

/**
*@function stop song
*@desc stops current song
*@param {Object} song
*/
          var stopSong = function(song) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
          };    // closes stop song function

/**
*@function index
*@desc gets index of songs
*@type variable
*/
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);        //grabs index of song
          };

/**
*@desc active song object from list of songs
*@type {Object}
*/
          SongPlayer.currentSong = null;

/**
*@desc Current playback time (seconds) of currently playing song
*@type {Number}
*/
          SongPlayer.currentTime = null;

/**
*@function play
*@desc play current or new song
*@param {Object} song
*/
          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;    //assigns value of song or current song to song variable
              if (SongPlayer.currentSong !== song) {
                setSong(song);    //refers to function setSong
                playSong(song);

              } else if (SongPlayer.currentSong === song) {     // if song is current song then song must be paused
                if (currentBuzzObject.isPaused()) {   // checks if song is paused
                  playSong(song);       // plays the song
              }
           }
        };    // closes play SongPlayer function
/**
*@function pause
*@desc pause current song
*@param {Object} song
*/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;    // assigns value of song or current song to variable song
            currentBuzzObject.pause();
            song.playing = false;   // updates boolean
        };    // closes pause SongPlayer function

/**
*@function previous
*@desc hit previous song
*@param {Object}
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);    //get index of current song playing
            currentSongIndex--;                                             // decrease index by one to go back to previous song

            if(currentSongIndex < 0) {                        // if index is less than 0 stop current song
                stopSong();        // set value of currently playing song to first song
            }   else {
                  var song = currentAlbum.songs[currentSongIndex];   //if greater than 0 moves to previous song and play it
                    setSong(song);
                    playSong(song);
            }   // close else statement
        };  // close previous function

/**
*@function next
*@desc switch to next song
*@param {Object}
*/
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if(currentSongIndex >= currentAlbum.songs.length) {
                stopSong();
            } else {
              var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };  // close next function

/**
*@function set current time
*@desc sets current time (in seconds) of current song playing
*param {Number} time
*/
        SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
              currentBuzzObject.setTime(time);
          }
        };  // closes set time function

        return SongPlayer;      // makes SongPlayer properties and methods public to rest of application
    }     // closes SongPlayer function

    angular
      .module('blocJams')
      .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
