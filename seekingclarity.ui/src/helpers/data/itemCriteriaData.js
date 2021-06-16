import axios from 'axios';
import { baseUrl } from '../config.json';

const itemCriteriaUrl = `${baseUrl}/itemcriteria`;

const getItemCriteria = (itemId) => new Promise((resolve, reject) => axios.get(`${itemCriteriaUrl}/${itemId}`)
  .then((response) => { resolve(response.data); })
  .catch((error) => reject(error)));

const createItemCriteria = (criteriaObject) => axios.post(`${itemCriteriaUrl}`, criteriaObject);

const updateItemCriteria = (itemCriteriaId, itemCriteriaObj) => new Promise((_resolve, reject) => axios.put(`${itemCriteriaUrl}/${itemCriteriaId}`, itemCriteriaObj)
  .catch((error) => reject(error)));

export default { createItemCriteria, updateItemCriteria, getItemCriteria };
