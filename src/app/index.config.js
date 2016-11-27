export function config ($logProvider, $authProvider, $windowProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);
    /*
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}); */

    // Set options third-party lib
    // satellizer
    $authProvider.httpInterceptor = function() { return true; };
    $authProvider.withCredentials = true;
    $authProvider.tokenRoot = null;
    $authProvider.baseUrl = '/api';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'anynote';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';
}
