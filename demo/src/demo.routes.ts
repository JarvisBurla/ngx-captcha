import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InstallationComponent } from './installation.component';
import { InvisibleReCaptchaDemoComponent } from './invisible-recaptcha-demo.component';
import { ReCaptcha2DemoComponent } from './re-captcha-2-demo.component';
import { ReCaptcha3DemoComponent } from './re-captcha-3-demo.component';
import {ReCaptchaV23DemoComponent} from "./re-captcha-v-2-3-demo.component";

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: ReCaptcha2DemoComponent
            },
            {
                path: 'installation', component: InstallationComponent
            },
            {
                path: 'invisible', component: InvisibleReCaptchaDemoComponent
            },
            {
                path: 'recaptcha2', component: ReCaptcha2DemoComponent
            },
            {
                path: 'recaptcha3', component: ReCaptcha3DemoComponent
            },
            {
               path: 'recaptcha-v2v3', component: ReCaptchaV23DemoComponent
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DemoRoutes { }
