import axios from 'axios';

export const request = (opts = {}, optsHeader = {}) => {
  const defaultOptions = {
    ...opts,
    headers: optsHeader,
  };

  const axiosApi = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API}`,
    ...defaultOptions,
  });

  return axiosApi;
};

export default request;
