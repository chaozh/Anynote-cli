export function PostEditorDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/postEditor/postEditor.html',
        scope: {
            homeTxt: '@',
            homeLink: '&',
            tags: '=',
            excerpts: '='
        },
        controller: PostEditorController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class NotesModalController {
    constructor($uibModalInstance, excerpts) {
        'ngInject';

        this.$uibModalInstance = $uibModalInstance;
        this.excerptsData = excerpts;
    }

    ok() {
        this.$uibModalInstance.close();
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

class PostEditorController {
    constructor ($uibModal) {
        'ngInject';

        Object.assign(this, {
            $uibModal
        });
    }

    addNote() {
        let modalInstance = this.$uibModal.open({
              templateUrl: 'notesModal.html',
              controller: NotesModalController,
              controllerAs: 'vm',
              bindToController : true,
              resolve: {
                excerpts: () => {
                  return this.excerpts;
                }
              }
        });

        modalInstance.result.then();
    }
}
