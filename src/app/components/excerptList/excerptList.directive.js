export function ExcerptListDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/excerptList/excerptList.html',
        scope: {
            titleTxt: '@',
            excerptsData: '&'
        },
        controller: ExcerptListController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class ExcerptListController {
    constructor () {
        'ngInject';
        this.excerpts = [{title:'test', content: '<p>good</p>'},
        {title:'test', content: '<p>good</p>'}];
    }
}
