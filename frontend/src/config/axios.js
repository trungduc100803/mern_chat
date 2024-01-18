import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:4000/api/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
    }
});


request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = error.response?.status || 500

    switch (status) {
        case 401: {
            console.log('401')
            return Promise.reject(error);
        }
        case 403: {
            console.log('403')
            return Promise.reject(error);
        }
        case 400: {
            console.log('400')
            return Promise.reject(error);
        }
        case 404: {
            console.log('404')
            return Promise.reject(error);
        }
        default: {
            console.log('500')
            return Promise.reject(error);
        }
    }

});



export default request