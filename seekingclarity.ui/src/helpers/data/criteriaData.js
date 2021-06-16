import axios from 'axios';
import { baseUrl } from '../config.json';

const criteriaUrl = `${baseUrl}/criteria`;

const getAllCriteria = () => new Promise((resolve, reject) => axios
  .get(`${criteriaUrl}`)
  .then((response) => resolve(response.data))
  .catch((error) => reject(error)));

const createCriteria = (criteriaObject) => axios.post(`${criteriaUrl}`, criteriaObject);

const updateCriteria = (criteriaId, criteriaObj) => new Promise((_resolve, reject) => axios.put(`${criteriaUrl}/${criteriaId}`, criteriaObj)
  .catch((error) => reject(error)));

export default {
  getAllCriteria,
  createCriteria,
  updateCriteria
};
