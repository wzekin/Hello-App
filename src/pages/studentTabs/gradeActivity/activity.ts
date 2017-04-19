/**
 * Created by zekin on 17-4-9.
 */
import {Component} from '@angular/core';
import {NavController, ActionSheetController, Events, ToastController} from 'ionic-angular';

import {Activity} from '../../../models/models';
import {OtherService, StudentService} from '../../../models/models.service';
import {PsPage} from "../../Popover/ChangePassword/ps";

@Component({
  selector: 'page-home',
  templateUrl: 'activity.html'
})
export class GradeActivityPage {
  activities: Activity[];

  constructor(public navCtrl: NavController,
              public toastCtrl:ToastController,
              public actionSheetCtrl: ActionSheetController,
              public event: Events,
              private otherService:OtherService,
              private studentService: StudentService) {
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

  getGradeActivity() {
    this.studentService.getGrade()
      .then(response => {
        this.activities = response
      })
  }

  setJion(activityid){
    this.studentService.setJion(activityid)
      .then(response =>{
        if (response === "您已经报过名了！"){
          let toast = this.toastCtrl.create({
            message: '您已经报过名了！',
            duration: 3000,
            position:"middle"
          });
          toast.present();
        }else{
          let toast = this.toastCtrl.create({
            message: '报名成功！',
            duration: 3000,
            position:"middle"
          });
          toast.present();
        }
      })
  }
  ionViewWillEnter() {
    this.getGradeActivity()
  }
}
