export function config ($logProvider, $authProvider, $windowProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    // satellizer
    // var $window = $windowProvider.$get();
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
