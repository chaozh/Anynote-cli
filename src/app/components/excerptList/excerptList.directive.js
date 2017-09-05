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
    constructor ($scope, $state, $stateParams, NOTE_EVENTS) {
        'ngInject';

        Object.assign(this, {
            $scope, $state, $stateParams, NOTE_EVENTS
        });

        // fetched from remote
        this.$scope.$on(this.NOTE_EVENTS.noteAllLoaded, (notes) => {
            this.filteredExcerpts = this.excerpts;
        });
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

          if (excerpt.tags.find(x => x.toLowerCase().includes(text))) {
            return true;
          }
        });
    }

    edit(id) {
        //trigger refresh event
        this.$state.go('notes.edit', { id: id });
    }

    share() {

    }

    star(id) {

    }

    delete(id) {

    }
}
