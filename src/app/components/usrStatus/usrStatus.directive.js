export function UsrStatusDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/usrStatus/usrStatus.html',
        scope: {

        },
        controller: UsrStatusController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class UsrStatusController {
    constructor (authService, userService) {
        'ngInject';

        this.authService = authService;
        this.isLogin = this.userService.user;
    }

    logout() {
        this.authService.logout();
    }
}
