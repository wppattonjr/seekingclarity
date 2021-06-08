import axios from 'axios';
import { baseUrl } from '../config.json';

const productGroupUrl = `${baseUrl}/groups`;

const getAllProductGroups = () => new Promise((resolve, reject) => axios
  .get(`${productGroupUrl}`)
  .then((response) => resolve(response.data))
  .catch((error) => reject(error)));

const getAllUserProducts = (userId) => new Promise((resolve, reject) => axios.get(`${productGroupUrl}/all/${userId}`)
  .then((response) => { resolve(response.data); })
  .catch((error) => reject(error)));

export default { getAllProductGroups, getAllUserProducts };
