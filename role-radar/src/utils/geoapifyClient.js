import axios from 'axios';
import { GEOAPIFY_KEY } from './chaves';

const GEOAPIFY_AUTH_PARAMS = { apiKey: GEOAPIFY_KEY };

const geoapifyClient = axios.create({
  baseURL: 'https://api.geoapify.com/v2/',
  params: GEOAPIFY_AUTH_PARAMS,
});


export default geoapifyClient;
