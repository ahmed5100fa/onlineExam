import { VerifyOtpData } from "../interfaces/auth.interface";

export class AuthEndPoint {
    static readonly LOGIN  = "https://exam.elevateegy.com/api/v1/auth/signin"; 
    static readonly REGISTER  = "https://exam.elevateegy.com/api/v1/auth/signup"; 
    static readonly CHANGEPASS  = "https://exam.elevateegy.com/api/v1/auth/changePassword"; 
    static readonly LOGOUT  = "https://exam.elevateegy.com/api/v1/auth/logout"; 
    static readonly FORGETPASS  = "https://exam.elevateegy.com/api/v1/auth/forgotPassword"; 
    static readonly RESETPASS  = "https://exam.elevateegy.com/api/v1/auth/resetPassword"; 
    static readonly GETLOGGEDUSER  = "https://exam.elevateegy.com/api/v1/auth/profileData"; 
    static readonly EDITPROFILE  = "https://exam.elevateegy.com/api/v1/auth/editProfile"; 
    static readonly DELETEME  = "https://exam.elevateegy.com/api/v1/auth/deleteMe"; 
    static readonly VERIFYRESETCODE = "https://exam.elevateegy.com/api/v1/auth/verifyResetCode";
}