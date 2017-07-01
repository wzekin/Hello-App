import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import {TeacherTabsPage} from '../teacherTabs/tabs'
import {StudentTabsPage} from '../studentTabs/tabs'

import {OtherService} from '../../models/models.service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public otherService:OtherService,
              public alertCtrl: AlertController) {

  }

  username: string = '';
  password: string = '';
  select: string = '';

  login(): void {
    if (this.username === '') {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请输入教育ID！',
        buttons: ['OK']
      });
      alert.present();
      return
    } else if (this.password === '') {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请输入密码！',
        buttons: ['OK']
      });
      alert.present();
      return
    } else if (this.select === '') {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请选择用户类型！',
        buttons: ['OK']
      });
      alert.present();
      return
    }
    this.otherService.login(this.username,this.password,this.select)
      .then(response => {
        if (response === "成功，教师登录！") {
          console.log("success teacher");
          this.navCtrl.push(TeacherTabsPage);
          this.clear();
        } else if (response === "成功，学生登录！") {
          console.log("success student");
          this.navCtrl.push(StudentTabsPage);
          this.clear();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Warning!',
            subTitle: response,
            buttons: ['OK']
          });
          alert.present();
        }
      })
  }

  clear():void{
    this.username = '';
    this.password = '';
    this.select = '';
  }
}
