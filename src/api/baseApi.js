import axios from 'axios';
import firebase from '../services/firebase';

const getIdTokenRefreshed = async () => {
  return new Promise(async (resolve, reject) => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        unsubscribe();
        const refreshedToken = user.getIdToken(true)
          .catch(err => console.error(err))
        resolve(refreshedToken)
      }, reject)
  })
};
export const request = (opts = {}, optsHeader = {}) => {
  const defaultOptions = {
    ...opts,
    headers: optsHeader,
  };

  const axiosApi = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API}`,
    ...defaultOptions,
  });
  axiosApi.interceptors.request.use(async (config) => {
    const token = await firebase.auth().currentUser.getIdToken();
    config.headers['Authorization'] = `Bearer ${token}`;
    return Promise.resolve(config);
  },
    function (error) {
      return Promise.reject(error);
    });
  axiosApi.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await getIdTokenRefreshed();
          config.headers['Authorization'] = `Bearer ${rs}`;
          return axiosApi(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      return Promise.reject(err);
    }
  );
  return axiosApi;
};

export default request;
