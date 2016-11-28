export class LoginController {
    constructor ($state, authService, userService) {
        'ngInject';

        Object.assign(this, {
            $state, authService, userService
        });
        this.form = {};
        this.alerts = [];
    }
    // TODO:
    changeView() {
        // prev url
        this.$state.go('notes');
    }

    errorHandle(resp) {
        this.alerts.push({
            type: 'danger',
            msg: resp.data.message || resp.data || resp.statusText
        });
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
            this.changeView();

        }).catch((resp) => {
            this.errorHandle(resp);
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
            this.changeView();

        }).catch((resp) => {
            this.errorHandle(resp);
        });
    }

    closeAlert(index) {
        this.alerts.splice(index, 1);
    }
}
