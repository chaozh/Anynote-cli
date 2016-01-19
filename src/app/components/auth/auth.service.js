export class AuthService {
    constructor($http, $q, $auth) {
        'ngInject';

        Object.assign(this, {
            $http, $q, $auth
        });

        this.credentials = {};
    }

    checkPermission() {
        return this.$auth.validateUser();
    }

    signup(registForm) {
        this.$auth.submitRegistration(registForm)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    }

    login(credentials) {
        this.$auth.submitLogin(credentials)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    }

    isAuthenticated() {
        return !!this.credentials.userId;
    }

    logout() {
        this.$auth.signOut()
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    }
}
