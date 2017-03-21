import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home'

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        private http: HTTP) {

    }

    username: string;
    password: string;
    select: string;
    login(): void  {
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
        this.http.get('http://127.0.0.1:8080/message/login',{
            'select':this.select,
            'username':this.username,
            'password':this.password,
        },{ withCredentials: true })
        .then(response => {
            if (response.data === "success teacher") {
                console.log("success teacher");
                this.navCtrl.push(HomePage)
            } else if (response.data === "success student") {
                console.log("success student");
            } else {
                let alert = this.alertCtrl.create({
                    title: 'Warning!',
                    subTitle: response.data ,
                    buttons: ['OK']
                });
                alert.present();
            }
        })
    }
}
