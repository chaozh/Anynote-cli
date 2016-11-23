export class AuthService {
    constructor($http, $q, $auth) {
        'ngInject';

        Object.assign(this, {
            $http, $auth
        });

        this.credentials = {};
    }

    isAuthenticated() {
        return this.$auth.isAuthenticated(); //permission
    }

    signup(registForm, options) {
        return this.$auth.signup(registForm, options);
    }

    login(credentials, options) {
        return this.$auth.login(credentials, options);
    }

    logout() {
        this.$auth.logout();
    }
}
