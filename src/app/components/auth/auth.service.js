export class AuthService {
    constructor($http, $q, $auth) {
        'ngInject';

        Object.assign(this, {
            $http, $q, $auth
        });

        this.credentials = {};
    }

    checkPermission() {
        return this.$auth.isAuthenticated(); //permission
    }

    signup(registForm) {
        this.$auth.signup(registForm)
        .then((resp) => {
          // redirect_uri
        })
        .catch((resp) => {
          // handle error response
        });
    }

    login(credentials) {
        this.$auth.login(credentials)
        .then((resp) => {
          // should with redirect_uri
        })
        .catch((resp) => {
          // handle error response
        });
    }

    isAuthenticated() {
        return this.$auth.isAuthenticated();
        //return !!this.credentials.userId;
    }

    logout() {
        this.$auth.logout()
        .then((resp) => {
          // handle success response
        })
        .catch((resp) => {
          // handle error response
        });
    }
}
