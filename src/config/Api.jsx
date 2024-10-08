import axios from 'axios'
import Swal from 'sweetalert2';
import Messages from '../components/Messages';

const Api = axios.create({
    // baseURL: 'http://localhost:3000/'
    baseURL: 'https://fs29a-backend-5aa5.onrender.com/'
})

Api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    Messages.error(error.response.data);
    return Promise.reject(error);
});

export default Api;