import { Routes } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'forgot',
                component: ForgotComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'logout',
                component: LogoutComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    }
]