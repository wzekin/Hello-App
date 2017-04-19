/**
 * Created by zekin on 17-4-9.
 */
import {Component} from '@angular/core';
import {NavController,ActionSheetController,Events} from 'ionic-angular';

import {Activity, Student,Jion} from '../../../models/models';
import {OtherService, StudentService} from '../../../models/models.service';
import {PsPage} from "../../Popover/ChangePassword/ps";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class StudentHomePage {
  student:Student = new Student();

  constructor(public navCtrl: NavController,
              public actionSheetCtrl:ActionSheetController,
              public event:Events,
              private otherService:OtherService,
              private studentService:StudentService)
  {}

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

  getStudentMessage(){
    this.studentService.getStudent()
      .then(response =>{
        this.student = response
      })
  }

  ionViewWillEnter() {
    this.getStudentMessage()
  }
}
