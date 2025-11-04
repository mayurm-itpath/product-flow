import client, { METHODS } from "./client";

export const api = {
  auth: {
    signup: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        method: METHODS.POST,
        url: "/api/auth/signup",
        data,
        ...configs,
      }),
    login: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        method: METHODS.POST,
        url: "/api/auth/login",
        data,
        ...configs,
      }),
    logout: ({ ...configs }) =>
      client({
        method: METHODS.POST,
        url: "/api/auth/logout",
        ...configs,
      }),
    forgotPassword: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        method: METHODS.POST,
        url: "/api/auth/forgot-password",
        data,
        ...configs,
      }),
    resetPassword: ({
      data,
      token,
      ...configs
    }: {
      data: any;
      token: string;
      [key: string]: any;
    }) =>
      client({
        method: METHODS.POST,
        url: `/api/auth/reset-password/${token}`,
        data,
        ...configs,
      }),
  },
  user: {
    updateById: ({
      id,
      data,
      ...configs
    }: {
      id: string;
      data: any;
      [key: string]: any;
    }) =>
      client({
        method: METHODS.PATCH,
        url: `/api/user/update-profile/${id}`,
        data,
        ...configs,
      }),
  },
};
