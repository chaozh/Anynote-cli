/* global moment:false */
'use strict';

angular
.module('anyNoteCli')
.constant('moment', moment)
.constant('APIURL', '/api')
.constant('NOTE_EVENTS', {
    noteInit: 'note-init',
    noteLoaded: 'note-loaded',
    noteUpdate: 'note-update',
    noteRender: 'note-render',
    noteSync: 'note-sync'

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

