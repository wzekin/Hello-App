import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {NavController,ViewController} from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">修改密码</button>
      <button ion-item (click)="exit()">退出登录</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController,public navCtrl:NavController,private http: Http) {}


}
