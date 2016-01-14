export function NoteEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/noteEditor/noteEditor.html',
        scope: {
            homeTxt: '@',
            homeLink: '&',
            tags: '=',
            getTags: '&'
        },
        controller: NoteEditorController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class NoteEditorController {
    constructor () {
        'ngInject';

    }
}
