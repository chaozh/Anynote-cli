export function runBlock ($rootScope, $state, AUTH_EVENTS, authService, userService, $log) {
  'ngInject';
  $log.debug('runBlock end');
  //Authorized state check
  /*$rootScope.$on('$stateChangeStart',  (event, next, nextParams, prev, prevParams) => {

    if (next.name !== 'signin' && next.name !== 'signup') {

        if (authService.isAuthenticated()) {
            // $log.log("login");
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
            // $log.log("not login");
            event.preventDefault();
            // user is not logged in
            authService.url = next.name;
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            // TODO : first access notes may cause a bug
            $state.go('signin');
        }
    }
  });*/
}
