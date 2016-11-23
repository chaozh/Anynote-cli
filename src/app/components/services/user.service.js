export class UserService {

    constructor($http, $q, APIURL, moment) {
        'ngInject';

        Object.assign(this, {
            $http, $q, APIURL, moment
        });
    }

    getUser(){
        return ;
    }

    setUser(){

    }
}
