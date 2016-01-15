export function TagsEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/tagsEditor/TagsEditor.html',
        scope: {
            homeTxt: '@',
            homeLink: '&',
            tags: '=',
            getTags: '&'
        },
        controller: TagsEditorController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class TagsEditorController {
    constructor () {
        'ngInject';

    }
}
