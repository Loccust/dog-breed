import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const http = axios.create({
  headers: {
    "Content-type": "application/json",
    timeout: 10000,
  },
});

const requestHandler = (request: AxiosRequestConfig<any>) => {  
  // fetch the new token before making the call
  request.headers!.Authorization = localStorage.getItem("token") || "";
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Unauthorized");
  }
  return response;
};

const errorHandler = (error: any) => {
  return Promise.reject(error);
};

http.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

http.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default http;