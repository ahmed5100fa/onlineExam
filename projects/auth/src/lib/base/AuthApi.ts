import { Observable } from "rxjs";
import { AuthResponse, ChangePasswordData, ChangePasswordResponse, DeleteAccountResponse, ForgotPasswordData, ForgotPasswordResponse, LoginCredentials, LogoutResponse, RegisterCredentials, ResetPasswordData, ResetPasswordResponse, UpdateProfileData, UpdateProfileResponse, VerifyOtpData, VerifyOtpResponse } from "../interfaces/auth.interface";

export abstract class AuthApi {
    abstract Login (data : LoginCredentials) : Observable<AuthResponse>;
    abstract Register (data : RegisterCredentials) : Observable<AuthResponse>;
    abstract changePassword (data : ChangePasswordData, token : string) : Observable<ChangePasswordResponse>;
    abstract forgetPassword (data : ForgotPasswordData) : Observable<ForgotPasswordResponse>;
    abstract verifyCode(data : VerifyOtpData):Observable<VerifyOtpResponse>;
    abstract restPassword(data : ResetPasswordData):Observable<ResetPasswordResponse>;
    abstract logout(token : string):Observable<LogoutResponse>;
    abstract getLoggedUserInfo(token : string):Observable<AuthResponse>;
    abstract updateProfile(data : UpdateProfileData  , token : string):Observable<UpdateProfileResponse>;
    abstract deleteAccount(token : string):Observable<DeleteAccountResponse>

}