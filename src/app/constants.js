/* global moment:false */
'use strict';

angular
.module('anyNoteCli')
.constant('moment', moment)
.constant('APIURL', '/api')
.constant('NOTE_EVENTS', {
    noteInit: 'note-init', //created in local
    noteLoaded: 'note-loaded', // pull from remote
    noteUpdate: 'note-update', // update in local
    noteRender: 'note-render', // html generated
    noteSync: 'note-sync', // push to remote

    noteAllLoaded: 'note-all-loaded', // all notes pull from remote
    noteEdit: 'note-edit'
})
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

