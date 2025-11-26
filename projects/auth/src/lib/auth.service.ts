import { inject, Injectable } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from './dictionary/AuthEndPoint';
import { LoginCredentials, AuthResponse, RegisterCredentials, ChangePasswordResponse, ChangePasswordData, ForgotPasswordData, ForgotPasswordResponse, VerifyOtpData, VerifyOtpResponse, ResetPasswordData, ResetPasswordResponse, LogoutResponse, UpdateProfileData, UpdateProfileResponse, DeleteAccountResponse } from './interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthApi{
  _HttpClient = inject(HttpClient)

  //login
   Login(data: LoginCredentials): Observable<AuthResponse> {
      return this._HttpClient.post<AuthResponse>(AuthEndPoint.LOGIN , data)
  }

  //register
  Register(data: RegisterCredentials): Observable<AuthResponse> {
      return this._HttpClient.post<AuthResponse>(AuthEndPoint.REGISTER , data)
  }

  //changePassword
  changePassword(data : ChangePasswordData , token : string):Observable<ChangePasswordResponse>{
    return this._HttpClient.patch<ChangePasswordResponse>(AuthEndPoint.CHANGEPASS , data )
  }

  //forgetPassword
  forgetPassword(data : ForgotPasswordData):Observable<ForgotPasswordResponse>{
    return this._HttpClient.post<ForgotPasswordResponse>(AuthEndPoint.FORGETPASS , data)
  }

  //verifyCode
  verifyCode(data : VerifyOtpData):Observable<VerifyOtpResponse>{
    return this._HttpClient.post<VerifyOtpResponse>(AuthEndPoint.VERIFYRESETCODE , data)
  }

  //restPassword
  restPassword(data : ResetPasswordData):Observable<ResetPasswordResponse>{
    return this._HttpClient.put<ResetPasswordResponse>(AuthEndPoint.RESETPASS , data)
  }

  //logout
  logout(token : string):Observable<LogoutResponse>{
    return this._HttpClient.get<LogoutResponse>(AuthEndPoint.LOGOUT )
  }

  //get logged user info
  getLoggedUserInfo(token : string):Observable<AuthResponse>{
     return this._HttpClient.get<AuthResponse>(AuthEndPoint.GETLOGGEDUSER)
  }

  // updateProfile
  updateProfile(data : UpdateProfileData  , token : string):Observable<UpdateProfileResponse>{
    return this._HttpClient.put<UpdateProfileResponse>( AuthEndPoint.EDITPROFILE ,data )
  }

  //deleteAccount
  deleteAccount(token : string):Observable<DeleteAccountResponse>{
    return this._HttpClient.delete<DeleteAccountResponse>(AuthEndPoint.DELETEME )
  }
}
