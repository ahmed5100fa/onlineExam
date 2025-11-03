import { Routes } from '@angular/router';
import { AuthLayout } from './features/pages/auth/pages/auth-layout/auth-layout';
import { Signin } from './features/pages/auth/pages/signin/signin';
import { Signup } from './features/pages/auth/pages/signup/signup';
import { ForgetPassword } from './features/pages/auth/pages/forget-password/forget-password';
import { VerfiyCode } from './features/pages/auth/pages/verfiy-code/verfiy-code';
import { ChangePassword } from './features/pages/auth/pages/change-password/change-password';

export const routes: Routes = [
    {path : '' , component : AuthLayout , children : [
        {path : '' , redirectTo : 'login' , pathMatch : "full"},
        {path : 'login' , component: Signin , title : "signIn"},
        {path : 'signup' , component: Signup , title : "signUp"},
        {path : 'forgetpassword' , component : ForgetPassword , title : "forgetPassword"},
        {path : 'verifycode' , component : VerfiyCode , title : "verifyCode"},
        {path : 'changepassword' , component : ChangePassword , title : "changePassword"}
    ]}
];
