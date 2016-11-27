export function routerConfig ($stateProvider, $urlRouterProvider, USER_ROLES) {
  'ngInject';
  $stateProvider
    .state('login', {
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
    .state('home', {
      url:'',
      abstract: true,
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
    })
    .state('notes', {
        parent: 'home',
        url: '/notes',
        templateUrl: 'app/notes/notes.html',
        controller: 'NotesController',
        controllerAs: 'notes'
        // views: {
        //     "noteEditor": {
        //         replace: true, //defalut new note
        //         template: '<note-editor>'
        //     }
        // }
    })
    .state('edit', {
        parent: 'notes',
        url: '/edit/:id',
        template: '<note-editor>'
        //controller: 'NotesController',
        //controllerAs: 'notes'
    })
    .state('posts', {
        parent: 'home',
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
