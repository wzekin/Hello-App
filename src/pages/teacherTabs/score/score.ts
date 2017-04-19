import {Component} from '@angular/core';

import {NavController, AlertController, ActionSheetController, Events} from 'ionic-angular';
import {ActivityService, OtherService} from '../../../models/models.service'
import {Score} from '../../../models/models'
import {PsPage} from "../../Popover/ChangePassword/ps";

@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {
  selectGrade: string;
  selectClass: string;
  classes: string[];
  score: Score[] = [];
  isactive: boolean = false;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl:ActionSheetController,
    public event:Events,
    private activityService: ActivityService,
    private otherService:OtherService,
    public alertCtrl: AlertController
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

  getClass(): void {
    if (!this.selectGrade) {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请输入年级！',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.activityService.getClass(this.selectGrade)
        .then(c => {
          this.classes = c;
          this.classes.push("全年级")
        })
    }
  }

  getScore(): void {
    if (!this.selectGrade) {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请输入年级！',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let classes;
      if (this.selectClass === '全年级') {
        classes = ""
      } else {
        classes = this.selectClass
      }
      this.activityService.getScore(this.selectGrade, classes)
        .then(score => {
          this.score = score;
          console.log(this.score)
        })
      this.isactive = this.selectClass === '全年级' || this.selectClass === '';
    }
  }
}
