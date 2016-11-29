export function runBlock ($rootScope, $state, AUTH_EVENTS, authService, userService, $log) {
  'ngInject';
  $log.debug('runBlock end');
  //Authorized state check
  $rootScope.$on('$stateChangeStart',  (event, next, nextParams, prev, prevParams) => {
     $rootScope.prevState = prev.name;
     $rootScope.prevParams = prevParams;

    if (next.name !== 'signin' && next.name !== 'signup'){
        if (authService.isAuthenticated()) {
            // permission check
            if ('data' in next && 'authorizedRoles' in next.data) {
                let authorizedRoles = next.data.authorizedRoles;
                if (!userService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                }
            }
        } else {
            event.preventDefault();
            // user is not logged in
            //$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            $state.go('signin');
        }
    }
  });
}
