export type LoginAdminConfig = {
  secret: string;
  expires: string;
  refreshSecret: string;
  refreshExpires: string;
  forgotSecret: string;
  forgotExpires: string;
  confirmEmailSecret: string;
  confirmEmailExpires: string;
};
