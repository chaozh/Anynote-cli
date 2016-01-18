export function UsrStatusDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/usrStatus/usrStatus.html',
        scope: {
            usr: '=',
            getUsr: '&'
        },
        controller: UsrStatusController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class UsrStatusController {
    constructor () {
        'ngInject';

        this.usr = {
            id: 1,
            nickName: 'Yeoman',
            avatarPath: 'assets/images/yeoman.png'
        };
    }

    logout() {
        this.usr = {};
    }

    isAuthorized() {
        if(this.usr.id != 0)
            return true;
        else
            return false;
    }
}
