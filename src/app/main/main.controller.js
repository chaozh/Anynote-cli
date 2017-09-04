export class MainController {
    constructor ($scope, $state, AUTH_EVENTS, authService, userService) {
        'ngInject';

        Object.assign(this, {
            $scope, $state, AUTH_EVENTS, authService, userService
        });

        this.user = userService.getLocalUser();
        this.alerts = [];

        //TODO: AUTH_EVENTS listen
        this.$scope.$on(this.AUTH_EVENTS.loginSuccess, (event, data) => {
            console.log("success");
            // refresh nav
            this.alerts = [];
            this.user = userService.getLocalUser();
            // goto prev url
            if (authService.url) {
                let url = authService.url;
                authService.url = null;
                this.$state.go(url);
            } else {
                this.$state.go('notes');
            }
        });

        this.$scope.$on(this.AUTH_EVENTS.loginFailed, (event, data) => {
            this.errorHandle(data);
        });

        this.$scope.$on(this.AUTH_EVENTS.notAuthorized, (event, data) => {
            this.alerts.push({
                type: 'danger',
                msg: 'Unauthorized! You are not allowed to access this resource.'
            });
        });

        this.$scope.$on(this.AUTH_EVENTS.notAuthenticated, (event, data) => {
            console.log("not auth");
            //this.authService.logout();
            this.alerts.push({
                type: 'danger',
                msg: 'Sorry, You have to login.'
            });
            this.$state.go('signin');
        });

    }

    logout() {
        this.alerts = [];
        this.userService.removeLocalUser();
        this.authService.logout();
        // TODO cause access notes again?
        this.$state.go('signin');
    }

    closeAlert(index) {
        this.alerts.splice(index, 1);
    }

    // handle all errors
    errorHandle(resp) {
        this.alerts.push({
            type: 'danger',
            msg: resp.data.message || resp.data || resp.statusText
        });
    }
}
