import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { HTTP } from '@ionic-native/http';
import { MyApp } from './app.component';
import { AddPage } from '../pages/add/add';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ActivityService, JionService } from '../models/models.service'


@NgModule({
    declarations: [
        MyApp,
        AddPage,
        ContactPage,
        HomePage,
        TabsPage,
        LoginPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        FormsModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AddPage,
        ContactPage,
        HomePage,
        TabsPage,
        LoginPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ActivityService, JionService,HTTP]
})
export class AppModule {}
