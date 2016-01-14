export function PostEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/postEditor/postEditor.html',
        scope: {
            homeTxt: '@',
            homeLink: '&',
            tags: '=',
            getTags: '&'
        },
        controller: PostEditorController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class PostEditorController {
    constructor () {
        'ngInject';

    }
}
