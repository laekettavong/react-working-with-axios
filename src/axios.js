import axios from 'axios';

// granular level config
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

// granular config
//instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN FROM INSTANCE';

export default instance;