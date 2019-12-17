import { environment } from '../environments/environment';

var backend_url = 'https://mylarm-heroku.herokuapp.com';
//var backend_url = 'http://localhost:4000';

if (environment.production) {
    backend_url = '';
}

export { backend_url };