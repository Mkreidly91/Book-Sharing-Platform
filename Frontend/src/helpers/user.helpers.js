import { auth } from './auth.helpers';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/';

async function getAllFollowed() {
  try {
    const res = await axios.get(`${baseUrl}user/getAllFollowed`, auth());
    console.log(res.data);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}
async function getAllLiked() {
  try {
    const res = await axios.get(`${baseUrl}user/getAllLiked`, auth());
    console.log(res.data);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}
async function search({ author = '', genre = '', keywords = '' }) {
  try {
    const res = await axios.get(
      `${baseUrl}book/search/?author=${author}&genre=${genre}&keywords=${keywords}`,
      auth()
    );
    console.log(res);
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

async function addPost(data) {
  try {
    const res = await axios.post(`${baseUrl}user/post/`, data, auth());
    console.log(res);
    const post = res.data;
    return { post };
  } catch (err) {
    console.log(err);
    const {
      response: {
        data: { error },
      },
    } = err;

    return { error };
  }
}

export { getAllFollowed, follow, likeBook, search, getAllLiked, addPost };
