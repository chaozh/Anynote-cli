export function runBlock ($rootScope, AUTH_EVENTS, authService, userService, $log) {
  'ngInject';
  $log.debug('runBlock end');
  //Authorized state check
  $rootScope.$on('$stateChangeStart',  (event, next, nextParams, prev, prevParams) => {
     var authorizedRoles = next.data.authorizedRoles;
     $rootScope.prevState = prev.name;
     $rootScope.prevParams = prevParams;

      if (authService.isAuthenticated()) {
        if (!userService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        }
      } else {
        //event.preventDefault();
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
  });
}
