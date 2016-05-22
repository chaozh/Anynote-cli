export function UsrStatusDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/usrStatus/usrStatus.html',
        scope: {
            usr: '='
        },
        controller: UsrStatusController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class UsrStatusController {
    constructor (authService) {
        'ngInject';

        this.usr = {
            id: 1,
            nickName: 'Yeoman',
            avatarPath: 'assets/images/yeoman.png'
        };
        this.authService = authService;
    }

    logout() {
        this.authService.logout();
    }

    isAuthorized() {
        return this.authService.isAuthenticated();
    }
}
