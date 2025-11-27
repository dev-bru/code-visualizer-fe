/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_BASE_URL } from "../config/Config";
import { toast } from "react-toastify";
import { CODE } from "../config/Constants";

const apiinstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const apiinstanceFormData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

const DataPromise = (
  promise: any,
  toastStatus: boolean = true,
) => {
  const dataPromise = promise
    .then((response: any) => response)
    .then((response: any) => {
      if (
        response?.status === CODE?.OK_CODE ||
        response?.status === CODE?.CREATED
      ) {
        if (response?.status) {
          if (toastStatus) {
            toast.success(response.data?.message);
          }
          return response.data;
        } else if (toastStatus) {
          toast.error(response.data?.message);
          return response.data;
        }
      } else if (response?.status === CODE?.ACCEPTED) {
        if (toastStatus) {
          toast.success(response.data?.message);
        }
        return response;
      } else if (response?.status === CODE?.NO_CONTENT) {
        if (toastStatus) {
          toast.success(response.data?.message);
        }
        return response;
      } else if (response?.status === CODE?.BAD_REQUEST_CODE) {
        if (toastStatus) {
          toast.error(response.data?.message);
        }
        return response?.data;
      } else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
        toast.error(response.data?.message);
      } else if (response?.status === CODE?.NOT_FOUND) {
        if (toastStatus) {
          if (response.data?.message) {
            toast.error(response.data?.message);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        }
        return response?.data;
      } else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {
        toast.error("Internal Server Error");
        return response?.data;
      } else if (response?.status === CODE?.VALIDATION_CODE) {
        toast.error(response.data?.message);
        return response?.data;
      } else if (response?.status === CODE?.CONFLICT) {
        toast.error(response.data?.message);
      } else if (response?.status === CODE?.TIMEOUT) {
        toast.error(response.data?.message);
      } else if (response?.status === CODE?.UNPROCESSABLE_CONTENT) {
        toast.error(response.data?.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    })
    .catch(() => {
      toast.error("Something went wrong. Please try again.");
    });
  return dataPromise;
};

export const POSTAPI = (
  URL: string,
  params: any,
  toastStatus: boolean = true
) => {
  const promise = apiinstance.post(URL, params, {
    validateStatus: (status) => status >= 200 && status < 600,
  });
  return DataPromise(promise, toastStatus);
};

export const PUTAPI = (
  URL: string,
  params: any,
  toastStatus: boolean = true
) => {
  const promise = apiinstance.put(URL, params, {
    validateStatus: (status) => status >= 200 && status < 600,
  });
  return DataPromise(promise, toastStatus);
};

export const POSTASFORMDATA = (
  URL: string,
  params: any,
  toastStatus: boolean = false
) => {
  const promise = apiinstanceFormData.post(URL, params, {
    validateStatus: (status) => status >= 200 && status < 600,
  });
  return DataPromise(promise, toastStatus);
};

export const GETAPI = (URL: string, toastStatus: boolean = false) => {
  const promise = apiinstance.get(URL, {
    validateStatus: (status) => status >= 200 && status < 600,
  });
  return DataPromise(promise, toastStatus);
};

export const PATCHAPI = (URL: string, params: any, toastStatus: any = true) => {
  const promise = apiinstance.patch(URL, params, {
    validateStatus: (status) => status >= 200 && status < 600,
  });
  return DataPromise(promise, toastStatus);
};

export const PATCHASFORMDATA = (
  URL: string,
  params: any,
  toastStatus: boolean = true
) => {
  const promise = apiinstanceFormData.patch(URL, params, {
    validateStatus: (status) => status >= 200 && status < 600,
  });
  return DataPromise(promise, toastStatus);
};

export const DELETEAPI = (URL: string, toastStatus: boolean = true) => {
  const promise = apiinstance.delete(URL, {
    validateStatus: (status) => status >= 200 && status < 600,
  });
  return DataPromise(promise, toastStatus);
};
