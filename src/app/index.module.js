/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { NotesController } from './notes/notes.controller';
import { PostsController } from './posts/posts.controller';
import { NoteService } from '../app/components/note/note.service';
// import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { BooksMenuDirective } from '../app/components/booksMenu/booksMenu.directive';
import { ExcerptListDirective } from '../app/components/excerptList/excerptList.directive';

angular.module('anyNoteCli', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])
    .constant('moment', moment)
    .constant('Config', {
        APIURL: '/api'
    })
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    //.service('githubContributor', GithubContributorService)
    .service('noteService', NoteService)
    .controller('MainController', MainController)
    .controller('NotesController', NotesController)
    .controller('PostsController', PostsController)
    .directive('booksMenu', BooksMenuDirective)
    .directive('excerptList', ExcerptListDirective);
