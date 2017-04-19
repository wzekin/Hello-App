import {Component} from '@angular/core';

import {NavController, NavParams,AlertController} from 'ionic-angular';

import {Activity,Student} from '../../../../../models/models'
import {ActivityService} from '../../../../../models/models.service'

@Component({
  selector: 'page-addStu',
  templateUrl: 'addStu.html'
})
export class AddStuPage {
  select = {
    activity:'',
    classes:'',
    grade:'',
    student:'',
  };
  activities: Activity[];
  classes: string[];
  students: Student[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController,
              private activityService: ActivityService,) {
    this.activities = navParams.get("activities")
  }

  getClass(): void {
    if (!this.select.grade) {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请输入年级！',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.select.classes = '';
      this.select.student = '';
      this.students = [];
      this.activityService.getClass(this.select.grade)
        .then(c => {
          this.classes = c;
        })
    }
  }

  getStudent(): void {
    if (!this.select.grade){
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请输入年级！',
        buttons: ['OK']
      });
      alert.present();
    }else if (!this.select.classes){
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: '请输入班级！',
        buttons: ['OK']
      });
      alert.present();
    }else{
      this.activityService.getStudent(this.select.grade,this.select.classes)
        .then(students => this.students = students)
    }
  }

  AddStu(): void {
    this.activityService.addStu(this.select.activity,this.select.student)
    this.select = {
      activity:'',
      classes:'',
      grade:'',
      student:'',
    }
    this.navCtrl.pop()
  }
}
