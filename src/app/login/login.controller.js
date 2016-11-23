export class LoginController {
    // deal with auth?
    constructor ($state, authService) {
        'ngInject';

        Object.assign(this, {
            $state, authService
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
            this.authService.user = JSON.parse(resp.data.user);
            this.alerts.push({type: 'success', msg: 'Login success!'});
            //redirect to origin

        }).catch((resp) => {
            this.alerts.push({type: 'danger', msg: resp.data.message});
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
            this.alerts.push({type: 'success', msg: 'Success create account!'});
        }).catch((resp) => {
            this.alerts.push({type: 'danger', msg: resp.statusText});
        });
    }

    closeAlert(index) {
        this.alerts.splice(index, 1);
    }
}
