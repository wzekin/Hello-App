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
  templateUrl: 'canjia.html'
})
export class CanjiaPage {
  jions :Jion[];

  constructor(public navCtrl: NavController,
              public actionSheetCtrl:ActionSheetController,
              public event:Events,
              private otherService:OtherService,
              private studentService:StudentService
  ) {}

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
            this.event.publish('toLogin');
            this.otherService.exit();
          }
        }
      ]
    });
    actionSheet.present();
  }

  getCanjia(){
    this.studentService.getCanjia()
      .then(response =>this.jions=response)
  }

  ionViewWillEnter() {
    this.getCanjia()
  }
}
