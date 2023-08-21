import { auth } from './auth.helpers';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/';

async function getAllFollowed() {
  try {
    const res = await axios.get(`${baseUrl}user/getAllFollowed`, auth());
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function follow(userId) {
  try {
    const res = await axios.post(`${baseUrl}user/follow/${userId}`, {}, auth());
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

async function likeBook(bookId) {
  try {
    const res = await axios.post(`${baseUrl}user/like/${bookId}`, {}, auth());
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
export { getAllFollowed, follow, likeBook };
