import { Routes } from "@angular/router";
import { AuthLayout } from "./features/auth/pages/layout/auth-layout/auth-layout";
import { Signin } from "./features/auth/pages/signin/signin";
import { Signup } from "./features/auth/pages/signup/signup";
import { Home } from "./features/home/home";
import { Diplomas } from "./features/home/diplomas/diplomas";
import { authGuard } from "./shared/gardes/auth-guard";
import { prevlinkGuard } from "./shared/gardes/prevlink-guard";
import { Exams } from "./features/exams/pages/exams/exams";
import { Questions } from "./features/questions/questions";

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: "full" },
      {
        path: 'login',
        component: Signin,
        canActivate: [prevlinkGuard],
        data: {
          pageInfo: {
            title: 'Sign In',
            icon: 'fa-solid fa-sign-in-alt',
            iconPosition: 'left'
          }
        }
      },
      {
        path: 'signup',
        component: Signup,
        canActivate: [prevlinkGuard],
        data: {
          pageInfo: {
            title: 'Sign Up',
            icon: 'fa-solid fa-user-plus',
            iconPosition: 'left'
          }
        }
      },
      {
        path: 'forgetpassword',
        loadComponent: () => import("./features/auth/pages/forget-password/forget-password").then((c) => c.ForgetPasswordComponent),
        data: {
          pageInfo: {
            title: 'Forget Password',
            icon: 'fa-solid fa-key',
            iconPosition: 'left'
          }
        }
      }
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
          pageInfo: {
            title: 'Diplomas',
            icon: 'fa-solid fa-graduation-cap',
            iconPosition: 'left'
          },
          breadcrumb: 'Diplomas'
        }
      },
      {
        path: 'exams/:id',
        component: Exams,
        data: {
          pageInfo: {
            title: 'Exams',
            icon: 'fa-solid fa-book-open',
            iconPosition: 'left'
          },
          breadcrumb: 'Exams'
        }
      },
      {
        path: 'questions/:id',
        component: Questions,
        data: {
          pageInfo: {
            title: 'Questions',
            icon: 'fa-regular fa-circle-question',
            iconPosition: 'left'
          },
          breadcrumb: 'Questions'
        }
      },
      {
        path: 'setting',
        loadComponent: () => import("./features/setting/setting").then((c) => c.Setting),
        data: {
          pageInfo: {
            title: 'Account Settings',
            icon: 'fa-solid fa-cog',
            iconPosition: 'left'
          },
          breadcrumb: 'Account Settings'
        },
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: "full"
          },
          {
            path: 'profile',
            loadComponent: () => import("./features/profile/profile").then((c) => c.Profile),
            data: {
              pageInfo: {
                title: 'Profile',
                icon: 'fa-regular fa-user',
                iconPosition: 'left'
              },
              breadcrumb: 'Profile'
            }
          },
          {
            path: 'ChangePass',
            loadComponent: () => import("./features/setting/components/changeprofilepass/changeprofilepass").then((c) => c.Changeprofilepass),
            data: {
              pageInfo: {
                title: 'Change Password',
                icon: 'fa-solid fa-key',
                iconPosition: 'left'
              },
              breadcrumb: 'Change Password'
            }
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home/diplomas',
    pathMatch: 'full'
  }
];
