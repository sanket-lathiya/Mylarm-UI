import { environment } from '../environments/environment';

var backend_url = 'https://mylarm-heroku.herokuapp.com';

if (environment.production) {
    backend_url = '';
}

export { backend_url };