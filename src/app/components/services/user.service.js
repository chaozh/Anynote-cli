export class UserService {

    constructor($http, $q, $sessionStorage, APIURL, moment) {
        'ngInject';

        Object.assign(this, {
            $http, $q, $sessionStorage, APIURL, moment
        });
        this.user = null;
        this.$sessionStorage.$default({
            user: null
        });
    }

    isAuthorized(authorizedRoles) {
        return true;
        //return (authorizedRoles.indexOf(this.user.role) !== -1);
    }

    updateUser(user) {
        return this.$http.put(this.APIURL + '/users/' + user.id, user).then(res => {
          this.setLocalUser(res.data.user);
          return res.data;
        });
    }

    getLocalUser() {
        let user = this.user;
        if (!user) {
            //fetch from local
            user = this.$sessionStorage.user;
        }

        return user;
    }

    setLocalUser(user) {
        this.user = user;
        //update local
        this.$sessionStorage.user = user;
    }

    removeLocalUser() {
        this.user = null;
        //remove local
        this.$sessionStorage.$reset({
            user: null
        });
    }
}
