import { auth } from './auth.helpers';
import axios from 'axios';
const baseUrl = 'http://localhost:8080/';

async function getAllFollowed() {
  try {
    const res = await axios.get(`${baseUrl}user/getAllFollowed`, auth());
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

async function follow() {
  try {
    const res = await axios.get(`${baseUrl}user/getAllFollowed`, auth());
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
export { getAllFollowed };
