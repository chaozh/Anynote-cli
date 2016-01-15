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

class NotesModalController {
    constructor($modalInstance, excerpts) {
        'ngInject';

        this.$modalInstance = $modalInstance;
        this.excerptsData = excerpts;
    }

    ok() {
        this.$modalInstance.close();
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }
}

class PostEditorController {
    constructor ($modal) {
        'ngInject';

        Object.assign(this, {
            $modal
        });

        this.excerptsData = [{title:'test', content: '<p>good</p>'},
        {title:'test2', content: '<p>good</p>'}];
    }

    addNote() {
        let modalInstance = this.$modal.open({
              templateUrl: 'notesModal.html',
              controller: NotesModalController,
              controllerAs: 'vm',
              bindToController : true,
              resolve: {
                excerpts: () => {
                  return this.excerptsData;
                }
              }
        });

        modalInstance.result.then();
    }
}
