import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

import {Activity} from '../../../../../models/models'
import {ActivityService} from '../../../../../models/models.service'

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  activity: Activity = new Activity();

  constructor(public navCtrl: NavController,private activityService:ActivityService) {
  }

  AddActivity():void{
    console.log(this.activity)
    this.activityService.addActivity(this.activity);
    this.activity = new Activity();
    this.navCtrl.pop()
  }
}
