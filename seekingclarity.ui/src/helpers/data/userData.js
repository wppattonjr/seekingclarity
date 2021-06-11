import axios from 'axios';
import { baseUrl } from '../config.json';

const userUrl = `${baseUrl}/Users`;

const getUserByUid = (fbUid) => new Promise((resolve, reject) => {
  console.warn('LOOK HERE', fbUid);
  axios.get(`${userUrl}/${fbUid}`).then((response) => {
    resolve(response.data[0]);
  }).catch((error) => reject(error));
});

export default { getUserByUid };
