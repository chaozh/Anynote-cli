/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { LoginController } from './login/login.controller';
import { MainController } from './main/main.controller';
import { NotesController } from './notes/notes.controller';
import { PostsController } from './posts/posts.controller';
import { NoteService } from '../app/components/note/note.service';
import { AuthService } from '../app/components/auth/auth.service';
// import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { BooksMenuDirective } from '../app/components/booksMenu/booksMenu.directive';
import { ExcerptListDirective } from '../app/components/excerptList/excerptList.directive';
import { EditorOptionsDirective } from '../app/components/editorOptions/editorOptions.directive';
import { BooksEditorDirective } from '../app/components/booksEditor/booksEditor.directive';
import { PostEditorDirective } from '../app/components/postEditor/postEditor.directive';
import { NoteEditorDirective } from '../app/components/noteEditor/noteEditor.directive';
import { UsrStatusDirective } from '../app/components/usrStatus/usrStatus.directive';

angular.module('anyNoteCli', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.codemirror', 'ng-sortable', 'ng-token-auth'])
    .constant('moment', moment)
    .constant('Config', {
        APIURL: '/api'
    })
    // .constant('AUTH_EVENTS', {
    //     loginSuccess: 'auth-login-success',
    //     loginFailed: 'auth-login-failed',
    //     logoutSuccess: 'auth-logout-success',
    //     sessionTimeout: 'auth-session-timeout',
    //     notAuthenticated: 'auth-not-authenticated',
    //     notAuthorized: 'auth-not-authorized'
    // })
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    //.service('githubContributor', GithubContributorService)
    .service('noteService', NoteService)
    .service('authService', AuthService)
    .controller('LoginController', LoginController)
    .controller('MainController', MainController)
    .controller('NotesController', NotesController)
    .controller('PostsController', PostsController)
    .directive('booksMenu', BooksMenuDirective)
    .directive('excerptList', ExcerptListDirective)
    .directive('editorOptions', EditorOptionsDirective)
    .directive('booksEditor', BooksEditorDirective)
    .directive('postEditor', PostEditorDirective)
    .directive('noteEditor', NoteEditorDirective)
    .directive('usrStatus', UsrStatusDirective);
