import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  CollapseModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent, 
    LogoutComponent, 
    ForgotComponent, 
    RegisterComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule.forChild(AuthRoutes)
  ]
})
export class AuthModule { }
