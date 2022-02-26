import axios from 'axios';

const baseURL = process.env.BACK_URL;

const backApi = axios.create({ baseURL });

backApi.interceptors.request.use(
    async(config) => {
        const token = await localStorage.getItem('token');
        if ( token ) {
            config.headers['Authorization'] = token;
        }
        return config;
    }
);



export default backApi;