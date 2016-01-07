export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/notes',
      templateUrl: 'app/notes/notes.html',
      controller: 'NotesController',
      controllerAs: 'notes'
    });

  $urlRouterProvider.otherwise('/notes');
}
