export class MainController {
    // deal with auth?
    constructor (authService, userService) {
        'ngInject';

        this.authService = authService;
        this.user = authService.user;

        //AUTH_EVENTS listen
    }

    logout() {
        this.authService.logout();
    }
}
