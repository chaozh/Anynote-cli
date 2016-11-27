export class LoginController {
    constructor ($state, authService, userService) {
        'ngInject';

        Object.assign(this, {
            $state, authService, userService
        });
        this.form = {};
        this.alerts = [];
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
            this.$state.go(this.$scope.prevState, this.$scope.prevParams);

        }).catch((resp) => {
            this.alerts.push({
                type: 'danger',
                msg: data.message
            });
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
            this.$state.go(this.$scope.prevState, this.$scope.prevParams);

        }).catch((resp) => {
            this.alerts.push({
                type: 'danger',
                msg: data.message
            });
        });
    }

    closeAlert(index) {
        this.alerts.splice(index, 1);
    }
}
