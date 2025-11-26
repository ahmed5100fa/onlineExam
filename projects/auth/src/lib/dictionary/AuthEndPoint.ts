export class AuthEndPoint {
    private static readonly baseUrl: string = 'https://exam.elevateegy.com';

    static readonly LOGIN  = `${AuthEndPoint.baseUrl}/api/v1/auth/signin`;
    static readonly REGISTER  = `${AuthEndPoint.baseUrl}/api/v1/auth/signup`;
    static readonly CHANGEPASS  = `${AuthEndPoint.baseUrl}/api/v1/auth/changePassword`;
    static readonly LOGOUT  = `${AuthEndPoint.baseUrl}/api/v1/auth/logout`;
    static readonly FORGETPASS  = `${AuthEndPoint.baseUrl}/api/v1/auth/forgotPassword`;
    static readonly RESETPASS  = `${AuthEndPoint.baseUrl}/api/v1/auth/resetPassword`;
    static readonly GETLOGGEDUSER  = `${AuthEndPoint.baseUrl}/api/v1/auth/profileData`;
    static readonly EDITPROFILE  = `${AuthEndPoint.baseUrl}/api/v1/auth/editProfile`;
    static readonly DELETEME  = `${AuthEndPoint.baseUrl}/api/v1/auth/deleteMe`;
    static readonly VERIFYRESETCODE = `${AuthEndPoint.baseUrl}/api/v1/auth/verifyResetCode`;
}
