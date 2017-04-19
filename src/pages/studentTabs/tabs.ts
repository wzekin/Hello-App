/**
 * Created by zekin on 17-4-9.
 */
import {Component} from '@angular/core';
import {NavController, Events} from 'ionic-angular';

import {StudentHomePage} from './home/home';
import {CanjiaPage} from './canjia/canjia';
import {RootActivityPage} from './rootActivity/activity';
import  {GradeActivityPage} from './gradeActivity/activity'
import {ClassActivityPage} from  './classActivity/activity'

@Component({
  template: `
    <ion-tabs>
      <ion-tab [root]="tab1Root" tabTitle="个人信息" tabIcon="home"></ion-tab>
      <ion-tab [root]="tab2Root" tabTitle="活动综述" tabIcon="checkmark-circle"></ion-tab>
      <ion-tab [root]="tab3Root" tabTitle="团委活动" tabIcon="contacts"></ion-tab>
      <ion-tab [root]="tab4Root" tabTitle="年级活动" tabIcon="checkmark-circle"></ion-tab>
      <ion-tab [root]="tab5Root" tabTitle="班级活动" tabIcon="contacts"></ion-tab>
    </ion-tabs>
  `
})
export class StudentTabsPage {
  // this tells the teacherTabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StudentHomePage;
  tab2Root: any = CanjiaPage;
  tab3Root: any = RootActivityPage;
  tab4Root: any = GradeActivityPage;
  tab5Root: any = ClassActivityPage;

  constructor(public navCtrl: NavController, public events: Events) {

  };

  ionViewDidLoad() {
    this.listenEvents();
    //console.log('界面创建');
  }

  ionViewWillUnload() {
    //console.log('界面销毁');
    this.events.unsubscribe('toLogin');
  }

  listenEvents() {
    this.events.subscribe('toLogin', () => {
      this.navCtrl.pop();
      console.log('返回登录');
    });
  }


}

