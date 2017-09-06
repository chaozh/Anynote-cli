export function routerConfig ($stateProvider, $urlRouterProvider, USER_ROLES) {
  'ngInject';
  $stateProvider
    .state('main', {
      url:'',
      abstract: true,
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('login', {
        parent: 'main',
        url:'',
        abstract: true,
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        data: {
            authorizedRoles: [USER_ROLES.all]
        }
    })
    .state('signin', {
        parent: 'login',
        url:'/signin',
        templateUrl: 'app/login/signin.html'
    })
    .state('signup', {
        parent: 'login',
        url:'/signup',
        templateUrl: 'app/login/signup.html'
    })
    .state('notes', {
        parent: 'main',
        url: '/notes/:id',
        templateUrl: 'app/notes/notes.html',
        controller: 'NotesController',
        controllerAs: 'notes',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
        // views: {
        //     "noteEditor": {
        //         replace: true, //defalut new note
        //         template: '<note-editor>'
        //     }
        // }
    })
    .state('posts', {
        parent: 'main',
        url: '/posts',
        templateUrl: 'app/posts/posts.html',
        controller: 'PostsController',
        controllerAs: 'posts',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
    });

  $urlRouterProvider.otherwise('/notes');
}
