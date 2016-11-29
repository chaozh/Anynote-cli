export class LoginController {
    constructor ($rootScope, $state, AUTH_EVENTS, authService, userService) {
        'ngInject';

        Object.assign(this, {
            $rootScope, $state, AUTH_EVENTS, authService, userService
        });
        this.form = {};
    }

    signin() {
        this.authService.login({
            user: {
                name: this.form.name,
                pwd: this.form.pwd
            },
            rdcode: this.form.rdcode
        }).then((resp) => {
            //sore user status in local
            this.userService.setLocalUser(angular.fromJson(resp.data.user));
            this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);

        }).catch((resp) => {
            this.$rootScope.$broadcast(this.AUTH_EVENTS.loginFailed, resp);
        });
    }

    signup() {
        this.authService.signup({
            user: {
                name: this.form.name,
                pwd: this.form.pwd,
                email: this.form.email
            },
            rdcode: this.form.rdcode
        }).then((resp) => {
            this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);

        }).catch((resp) => {
            this.$rootScope.$broadcast(this.AUTH_EVENTS.loginFailed, resp);
        });
    }
}
