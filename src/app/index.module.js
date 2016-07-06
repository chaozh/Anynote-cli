import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { LoginController } from './login/login.controller';
import { MainController } from './main/main.controller';
import { NotesController } from './notes/notes.controller';
import { PostsController } from './posts/posts.controller';
import { NoteService } from '../app/components/services/note.service';
import { PostService } from '../app/components/services/post.service';
import { AuthService } from '../app/components/services/auth.service';
// import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { BooksMenuDirective } from '../app/components/booksMenu/booksMenu.directive';
import { ExcerptListDirective } from '../app/components/excerptList/excerptList.directive';
import { EditorOptionsDirective } from '../app/components/editorOptions/editorOptions.directive';
import { BooksEditorDirective } from '../app/components/booksEditor/booksEditor.directive';
import { PostEditorDirective } from '../app/components/postEditor/postEditor.directive';
import { NoteEditorDirective } from '../app/components/noteEditor/noteEditor.directive';
import { UsrStatusDirective } from '../app/components/usrStatus/usrStatus.directive';

angular.module('anyNoteCli', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.codemirror', 'ng-sortable', 'satellizer'])
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    //.service('githubContributor', GithubContributorService)
    .service('authService', AuthService)
    .service('noteService', NoteService)
    .service('postService', PostService)
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
