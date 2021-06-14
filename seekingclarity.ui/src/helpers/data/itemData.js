import axios from 'axios';
import { baseUrl } from '../config.json';

const groupItemsUrl = `${baseUrl}/items`;

const getAllItems = () => new Promise((resolve, reject) => axios
  .get(`${groupItemsUrl}`)
  .then((response) => resolve(response.data))
  .catch((error) => reject(error)));

const getAllGroupItems = (groupId) => new Promise((resolve, reject) => axios.get(`${groupItemsUrl}/all/${groupId}`)
  .then((response) => { resolve(response.data); })
  .catch((error) => reject(error)));

const createGroupItem = (item) => axios.post(`${groupItemsUrl}`, item);

const updateProductItem = (productItemId, item) => new Promise((_resolve, reject) => axios.put(`${groupItemsUrl}/${productItemId}`, item)
  .catch((error) => reject(error)));

export default {
  getAllGroupItems,
  getAllItems,
  createGroupItem,
  updateProductItem
};
