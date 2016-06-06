export function EditorOptionsDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/editorOptions/editorOptions.html',
        scope: {
            homeTxt: '@',
            homeLink: '&',
            tags: '=',
            getTags: '&',
            preview: '=',
            star: '='
        },
        controller: EditorOptionsController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class EditorOptionsController {
    constructor () {
        'ngInject';

    }
}
