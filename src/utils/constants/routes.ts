export const pageRoutes = {
  home: "/",
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    forgotPassword: "/auth/forgot-password",
    resetPassword: (token: string) => `/auth/reset-password/${token}`,
  },
  user: {
    dashboard: "/user/dashboard",
    profile: "/user/profile",
    editProfile: "/user/edit-profile",
  },
};
