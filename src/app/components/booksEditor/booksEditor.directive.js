export function BooksEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/booksEditor/booksEditor.html',
        scope: {
            homeTxt: '@',
            homeLink: '&',
            tags: '=',
            getTags: '&'
        },
        controller: BooksEditorController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class BooksEditorController {
    constructor () {
        'ngInject';

    }
}
