export function ExcerptListDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/excerptList/excerptList.html',
        scope: {
            titleTxt: '@',
            excerpts: '='
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
    }

    search(text) {
        if (!text) {
          this.filteredExcerpts = this.excerpts;
          return;
        }
        text = text.toLowerCase();
        this.filteredExcerpts = this.excerpts.filter(excerpt => {
          if (excerpt.title.toLowerCase().includes(text)) {
            return true;
          }
          // if (excerpt.categories.find(x => x.toLowerCase().includes(text))) {
          //   return true;
          // }
          if (excerpt.tags.find(x => x.toLowerCase().includes(text))) {
            return true;
          }
        });
    }

    edit(id) {

    }

    share() {

    }

    star(id) {

    }

    delete(id) {

    }
}
