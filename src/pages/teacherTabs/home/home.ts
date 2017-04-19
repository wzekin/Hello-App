import {Component} from '@angular/core';
import {NavController, ActionSheetController, Events} from 'ionic-angular';

import {Activity, Jion} from '../../../models/models';
import {ActivityService, JionService, OtherService} from '../../../models/models.service';
import {AddPage} from './Fabs/add/add';
import {EndPage} from './Fabs/end/end'
import {AddStuPage} from "./Fabs/addStu/addStu";
import {PsPage} from "../../Popover/ChangePassword/ps";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Activities: Activity[];

  constructor(public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController,
              public event: Events,
              private activityService: ActivityService,
              private otherService: OtherService,
              private jionService: JionService,) {

  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '设置',
      buttons: [
        {
          text: '修改密码',
          handler: () => {
            this.navCtrl.push(PsPage);
          }
        }, {
          text: '退出登录',
          handler: () => {
            this.otherService.exit();
            this.event.publish('toLogin');
          }
        }
      ]
    });
    actionSheet.present();
  }

  getActivities(): void {
    this.activityService.getActivities()
      .then(activities => {

        this.Activities = activities;
        for (let i in this.Activities) {
          let activity = this.Activities[i]
          this.jionService.getJions(activity.Id)
            .then(jions => {
              activity.jions = jions
            })
        }
      });
  }

  setStatus(jion: Jion): void {
    if (jion.Status === "审核通过") {
      jion.Status = "审核不通过"
    } else {
      jion.Status = "审核通过"
    }
    this.jionService.setStatus(jion);
  }

  goToAdd(): void {
    this.navCtrl.push(AddPage)
    console.log(123456)
  }

  goToAddStu(): void {
    this.navCtrl.push(AddStuPage, {
      activities: this.Activities
    })
  }

  goToEnd(): void {
    this.navCtrl.push(EndPage, {
      activities: this.Activities
    })
  }

  ionViewWillEnter() {
    this.getActivities()
  }
}
