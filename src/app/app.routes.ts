import { Routes } from '@angular/router';
import { ForgetPassword } from './features/auth/pages/forget-password/forget-password';
import { AuthLayout } from './features/auth/pages/layout/auth-layout/auth-layout';
import { Signin } from './features/auth/pages/signin/signin';
import { Signup } from './features/auth/pages/signup/signup';

export const routes: Routes = [
    {path : '' , component : AuthLayout , children : [
        {path : '' , redirectTo : 'login' , pathMatch : "full"},
        {path : 'login' , component: Signin , title : "signIn"},
        {path : 'signup' , component: Signup , title : "signUp"},
        {path : 'forgetpassword' , component : ForgetPassword , title : "forgetPassword"}
    ]}
];
