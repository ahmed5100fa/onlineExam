import { Routes } from "@angular/router";
import { ForgetPasswordComponent } from "./features/auth/pages/forget-password/forget-password";
import { AuthLayout } from "./features/auth/pages/layout/auth-layout/auth-layout";
import { Signin } from "./features/auth/pages/signin/signin";
import { Signup } from "./features/auth/pages/signup/signup";
import { Home } from "./features/home/home";
import { Diplomas } from "./features/home/pages/diplomas/diplomas";
import { Changeprofilepass } from "./features/home/pages/setting/components/changeprofilepass/changeprofilepass";
import { Profile } from "./features/home/pages/setting/components/profile/profile";
import { Setting } from "./features/home/pages/setting/setting";
import { authGuard } from "./shared/gardes/auth-guard";
import { prevlinkGuard } from "./shared/gardes/prevlink-guard";
import { Exams } from "./features/home/pages/exams/exams";

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: "full" },
      { path: 'login', component: Signin, canActivate: [prevlinkGuard], title: "signIn" },
      { path: 'signup', component: Signup, canActivate: [prevlinkGuard], title: "signUp" },
      { path: 'forgetpassword', component: ForgetPasswordComponent, title: "forgetPassword" }
    ]
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'diplomas',
        pathMatch: "full"
      },
      {
        path: 'diplomas',
        component: Diplomas,
        data: {
          title: '<i class="fa-solid fa-graduation-cap me-2"></i>Diplomas',
          breadcrumb: 'Diplomas'
        }
      },
      {
        path: 'exams',
        component: Exams,
        data: {
          title: '<i class="fa-solid fa-book-open"></i></i>Exams',
          breadcrumb: 'Exams'
        }
      },
      {
        path: 'setting',
        component: Setting,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: "full" },
          {
            path: 'profile',
            component: Profile,
            data: {
              title: 'Profile',
              breadcrumb: 'Profile'
            }
          },
          {
            path: 'ChangePass',
            component: Changeprofilepass,
            data: {
              title: 'Change Password',
              breadcrumb: 'Change Password'
            }
          }
        ],
        data: {
          title: '<i class="fa-regular fa-user me-2"></i>Account Settings',
          breadcrumb: 'Account Settings'
        }
      }
    ]
  }
];
