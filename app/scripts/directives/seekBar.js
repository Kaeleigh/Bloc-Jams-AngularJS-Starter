(function() {
    function seekBar($document) {

        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
          templateUrl: '/templates/directives/seek_bar.html',
          replace: true,
          restrict: 'E',
          scope: {
             onChange: '&'
          },
          link: function(scope, element, attributes) {
              scope.value = 0;
              scope.max = 100;

              var seekBar = $(element);
/**
*@desc tracks value changes of attributes; max represents length of song while, value represents current playback time of song
*/

              attributes.$observe('value', function(newValue) {
                 scope.value = newValue;
              });

              attributes.$observe('max', function(newValue) {
                 scope.max = newValue;
              });

              var percentString = function() {          // calculates percentage of seek bar values
                 var value = scope.value;
                 var max = scope.max;
                 var percent = value / max * 100;
                 return percent + "%";
              };

              scope.fillStyle = function() {            // fillStyle declared and returns calculated percentage
                return {width: percentString()};
              };

              scope.thumbStyle = function() {
                 return {left: percentString()};
              };

              scope.onClickSeekBar = function(event) {          // updates seekbar value based on width and location of user's click
                var percent = calculatePercent(seekBar, event);
                scope.value = percent * scope.max;
                notifyOnChange(scope.value);                    // sends updated scope.value to functions evaluated by onChange
              };

              scope.trackThumb = function() {                     // tracks seekbar thumb when the user drags thumb
                  $document.bind('mousemove.thumb', function(event) {
                    var percent = calculatePercent(seekBar, event);
                      scope.$apply(function() {
                          scope.value = percent * scope.max;
                          notifyOnChange(scope.value);          // sends updated scope.value to functions evaluated by onChange
                      });
                });

                $document.bind('mouseup.thumb', function() {
                    $document.unbind('mousemove.thumb');
                    $document.unbind('mouseup.thumb');
                });
            };

            var notifyOnChange = function(newValue) {
               if (typeof scope.onChange === 'function') {        // checks if scope.onChange is a function
                  scope.onChange({value: newValue});              // tells angular to insert local variable newValue as the value argument we pass in SongPlayer.setCurrentTime()
               }  // closes if statement
            };  // closes notifyOnChange
          }
       }
    }

    angular
      .module('blocJams')
      .directive('seekBar', ['$document', seekBar]);
})();
