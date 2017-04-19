import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';

import { HomePage } from './home/home';
import { CollectPage } from './collect/collect';
import { ScorePage } from './score/score';

@Component({
    templateUrl: 'tabs.html'
})
export class TeacherTabsPage {
    // this tells the teacherTabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    tab2Root: any = CollectPage;
    tab3Root: any = ScorePage;

    constructor(public navCtrl: NavController,public events:Events) {

    };
  ionViewDidLoad() {
    this.listenEvents();
    //console.log('界面创建');
  }
  ionViewWillUnload() {
    //console.log('界面销毁');
    this.events.unsubscribe('toLogin');
  }

  listenEvents() {this.events.subscribe('toLogin', () => {
    this.navCtrl.pop();
    console.log('返回登录');
  });
  }


}
