import {Component, ViewChild} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {Storage} from '@ionic/storage';

import {LoginPage} from '../pages/login/login';
import {OtherService} from "../models/models.service";
import {TeacherTabsPage} from "../pages/teacherTabs/tabs";
import {StudentTabsPage} from "../pages/studentTabs/tabs";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage = LoginPage;

  constructor(platform: Platform, storage: Storage,otherService:OtherService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      storage.ready().then(() => {
        otherService.text().then(message =>{
          if (message === '没有登录！'){
            storage.remove('cookie')
          }else if(message === '老师登录！'){
            this.nav.push(TeacherTabsPage)
          }else if(message === '同学登录！'){
            this.nav.push(StudentTabsPage)
          }
        })
      })
    });
  }
}
