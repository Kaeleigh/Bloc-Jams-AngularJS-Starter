/**
There are 2 private attributes (currentSong) and (currentBuzzObject)
Two private functions (setSong) and (playSong)
Two public methods (SongPlayer.play) and (SongPlayer.pause)
*/

(function() {   // creates service that will play songs
    function SongPlayer() {
         var SongPlayer = {};
/**
*@desc currently playing song
*@type {Object}
*/
        var currentSong = null;
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
                currentBuzzObject.stop();     //stop that song
                currentSong.playing = null;   //updates boolean
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {   //creates new sound instance from music in assests
               formats: ['mp3'],
               preload: true
           });

           currentSong = song;    // sets chosen song as current song
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


        SongPlayer.play = function(song) {
            if (currentSong !== song) {
              setSong(song);    //refers to function setSong
              playSong(song);

           } else if (currentSong === song) {     // if song is current song then song must be paused
              if (currentBuzzObject.isPaused()) {   // checks if song is paused
                  playSong(song);       // plays the song
              }
           }
        };    // closes play SongPlayer function

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;   // updates boolean
        };    // closes pause SongPlayer function

        return SongPlayer;      // makes SongPlayer properties and methods public to rest of application
    }     // closes SongPlayer function

    angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer);
})();
