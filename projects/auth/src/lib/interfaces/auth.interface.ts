// login 
export interface LoginCredentials {
  email: string;
  password: string;
}

//regiter
export interface RegisterCredentials {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

//changePassword
export interface ChangePasswordData {
  oldPassword: string;
  password: string;
  rePassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  token: string; 
}

//forgetPassword
export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  info?: string;
  code?: number;
}

//verifyCode
export interface VerifyOtpData {
  resetCode: string;
}

export interface VerifyOtpResponse {
  status: string;
}

//restPassword
export interface ResetPasswordData {
  email: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  token: string;
}

//logout
export interface LogoutResponse {
  message: string;
}

// updateProfile
export interface UpdateProfileData {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: User;
}

//deleteAccount
export interface DeleteAccountResponse {
  message: string;
}

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}