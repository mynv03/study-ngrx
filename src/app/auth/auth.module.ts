import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        AngularFireAuthModule,

    ],
    exports: []
})
export class AuthModule {}