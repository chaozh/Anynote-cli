export class PostService {

    constructor($http, $q, APIURL, moment) {
        'ngInject';

        Object.assign(this, {
            $http, $q, APIURL, moment
        });
    }
}
