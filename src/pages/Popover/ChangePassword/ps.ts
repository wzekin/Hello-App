/**
 * Created by zekin on 17-4-8.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {NavController, AlertController} from 'ionic-angular';
import {OtherService} from "../../../models/models.service";

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          修改密码
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-item>
          <ion-label>原密码</ion-label>
          <ion-input [(ngModel)]="ps1" type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>新密码</ion-label>
          <ion-input [(ngModel)]="ps2" type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>重复密码</ion-label>
          <ion-input [(ngModel)]="ps3" type="password"></ion-input>
        </ion-item>

        <button ion-button full (click)="ChangePassword()">确定</button>
      </ion-list>
    </ion-content>
  `
})
export class PsPage {
  ps1: string;
  ps2: string;
  ps3: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private otherService:OtherService,
  ) {}

  ChangePassword() {
    if (this.ps1 === '') {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请s输入原密码！',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.ps1.length < 6 || this.ps2.length < 6) {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请输入6位以上的密码！',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.ps2 !== this.ps3) {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '两次输入密码不正确！',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.otherService.change(this.ps1,this.ps2)
        .then(response => {
          if (response !== "修改成功") {
            let alert = this.alertCtrl.create({
              title: 'Warning!',
              subTitle: response,
              buttons: ['OK']
            });
            alert.present();
          } else {
            this.navCtrl.pop()
          }
        })
    }
  }
}
