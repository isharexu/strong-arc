Arc.service('ArcNavigationService', [
  '$location',
  function($location) {
    var svc = {};
    svc.postLogoutNav = function(){
      $location.path('/login');
    };

    var getVisibilityInfo = function() {
      var prefixes = ['ms', 'moz', 'webkit'];
      var propName = 'hidden';
      var eventName = 'visibilitychange';

      prefixes.forEach(function(prefix) {
        if (window[prefix] !== undefined) {
          propName = prefix + 'Hidden';
          eventName = prefix + eventName;
        }
        return false;
      });

      return {
        propertyName: propName,
        eventName: eventName
      };
    };

    var visInfo = getVisibilityInfo();
    svc.visibilityChange = function(onHide, onShow) {
      var handleVisibilityChange = function(event) {
        if (document[visInfo.propertyName]) {
          if (typeof onHide === 'function') {
            onHide.call();
          }
        } else {
          if (typeof onShow === 'function') {
            onShow.call();
          }
        }
      };
      document.addEventListener(visInfo.eventName, handleVisibilityChange);
    };

    return svc;
  }
]);
