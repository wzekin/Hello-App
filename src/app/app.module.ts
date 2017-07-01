import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FormsModule} from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import {HTTP} from '@ionic-native/http';
import {Camera} from '@ionic-native/camera'
import {MyApp} from './app.component';

import {AddPage} from '../pages/teacherTabs/home/Fabs/add/add';
import {AddStuPage} from '../pages/teacherTabs/home/Fabs/addStu/addStu'
import {ScorePage} from '../pages/teacherTabs/score/score';
import {HomePage} from '../pages/teacherTabs/home/home';
import {TeacherTabsPage} from '../pages/teacherTabs/tabs';
import {LoginPage} from '../pages/login/login';
import {CollectPage} from  '../pages/teacherTabs/collect/collect'
import {ActivityPage} from '../pages/teacherTabs/collect/activity/activity'
import {ActivityService, JionService, StudentService, OtherService} from '../models/models.service'
import {EndPage} from '../pages/teacherTabs/home/Fabs/end/end'
import {PopoverPage} from '../pages/Popover/popover'
import {StudentTabsPage} from '../pages/studentTabs/tabs'
import {StudentHomePage} from '../pages/studentTabs/home/home'
import {CanjiaPage} from '../pages/studentTabs/canjia/canjia'
import {RootActivityPage} from '../pages/studentTabs/rootActivity/activity'
import {ClassActivityPage} from '../pages/studentTabs/classActivity/activity'
import {GradeActivityPage} from '../pages/studentTabs/gradeActivity/activity'
import {HttpModule}    from '@angular/http';
import {PsPage} from "../pages/Popover/ChangePassword/ps";

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    AddStuPage,
    EndPage,
    ScorePage,
    HomePage,
    TeacherTabsPage,
    LoginPage,
    CollectPage,
    ActivityPage,
    PopoverPage,
    StudentHomePage,
    StudentTabsPage,
    CanjiaPage,
    RootActivityPage,
    ClassActivityPage,
    GradeActivityPage,
    PsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    PsPage,
    AddStuPage,
    EndPage,
    ScorePage,
    HomePage,
    TeacherTabsPage,
    LoginPage,
    CollectPage,
    ActivityPage,
    PopoverPage,
    StudentHomePage,
    StudentTabsPage,
    CanjiaPage,
    RootActivityPage,
    ClassActivityPage,
    GradeActivityPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }, StudentService, ActivityService, JionService, OtherService, HTTP, Camera]
})
export class AppModule {
}
