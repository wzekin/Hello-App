/**
 * Created by zekin on 17-4-8.
 */
import { Component } from '@angular/core';

import {ActionSheetController, Events, NavController} from 'ionic-angular';

import { Activity } from '../../../models/models'
import {ActivityService, JionService, OtherService} from '../../../models/models.service'
import {ActivityPage} from './activity/activity'
import {PsPage} from "../../Popover/ChangePassword/ps";

@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html'
})
export class CollectPage {
  activities: Activity[] ;

  constructor(public navCtrl: NavController,
              public actionSheetCtrl:ActionSheetController,
              public event:Events,
              private activityService: ActivityService,
              private otherService:OtherService,
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
        },{
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
    this.activityService.getEndActivities()
      .then(activities => {
        this.activities = activities;
        for (let i in this.activities) {
          let activity = this.activities[i];
          this.jionService.getJions(activity.Id)
            .then(jions => {
              activity.jions = jions
            })
        }
        console.log(this.activities)
      });
  }

  entered(activity:Activity){
    this.navCtrl.push(ActivityPage,{
      activity:activity
    })
  }

  ionViewWillEnter(){
    this.getActivities()
  }
}

