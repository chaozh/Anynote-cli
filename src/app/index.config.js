export function config ($logProvider, $authProvider, $windowProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  // ng-token-auth
  var $window = $windowProvider.$get();
  $authProvider.configure({
      apiUrl:                  '/api',
      tokenValidationPath:     '/auth/validate',
      signOutUrl:              '/auth/out',
      emailRegistrationPath:   '/auth',
      accountUpdatePath:       '/auth',
      accountDeletePath:       '/auth',
      confirmationSuccessUrl:  $window.location.href,
      passwordResetPath:       '/auth/pwd',
      passwordUpdatePath:      '/auth/pwd',
      passwordResetSuccessUrl: $window.location.href,
      emailSignInPath:         '/auth/in',
      storage:                 'cookies',
      forceValidateToken:      false,
      validateOnPageLoad:      true,
      proxyIf:                 () => { return false; },
      proxyUrl:                '/proxy',
      omniauthWindowType:      'sameWindow',
      authProviderPaths: {
        github:   '/auth/github',
        facebook: '/auth/facebook',
        google:   '/auth/google'
      },
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type":   "Bearer",
        "client":       "{{ clientId }}",
        "expiry":       "{{ expiry }}",
        "uid":          "{{ uid }}"
      },
      cookieOps: {
        path: "/",
        expires: 9999,
        expirationUnit: 'days',
        secure: false,
        domain: 'domain.com'
      },
      parseExpiry: (headers) => {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: (response) => {
        return response.data;
      },
      handleAccountUpdateResponse: (response) => {
        return response.data;
      },
      handleTokenValidationResponse: (response) => {
        return response.data;
      }
    });
}
