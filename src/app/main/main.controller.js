export class MainController {
    constructor ($scope, $state, AUTH_EVENTS, authService, userService) {
        'ngInject';

        Object.assign(this, {
            $scope, $state, AUTH_EVENTS, authService, userService
        });

        this.user = userService.getLocalUser();
        this.alerts = [];

        //TODO: AUTH_EVENTS listen
        this.$scope.$on(this.AUTH_EVENTS.notAuthorized, (event, data) => {
            this.alerts.push({
                type: 'danger',
                msg: 'Unauthorized! You are not allowed to access this resource.'
            });
        });

       this.$scope.$on(this.AUTH_EVENTS.notAuthenticated, (event, data) => {
            //this.authService.logout();
            this.alerts.push({
                type: 'danger',
                msg: 'Sorry, You have to login.'
            });
            this.$state.go('signin');
      });

    }

    logout() {
        this.userService.removeLocalUser();
        this.authService.logout();
        this.$state.go('signin');
    }

    closeAlert(index) {
        this.alerts.splice(index, 1);
    }

    // handle all errors
}
