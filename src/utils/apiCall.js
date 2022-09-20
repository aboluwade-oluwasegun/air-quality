import axios from 'axios';

const postJSON = async (url, data) => {
  const options = {
    timeout: parseInt(process.env.TIMEOUT, 10),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, options)
      .then((res) => {
        console.log('api response: ', res.data);
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  postJSON,
};
