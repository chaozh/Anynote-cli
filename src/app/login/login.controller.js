export class LoginController {
    // deal with auth?
    constructor ($state, authService) {
        'ngInject';

        Object.assign(this, {
            $state, authService
        });
        this.user = {};
    }

    signin() {
        this.authService.login(this.user).then(() => {
          this.$state.go('notes');
        }).catch(() => {

        });
    }

    signup() {
        this.$state.go("notes");
        //this.authService.signup().then();
    }
}
