import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { Activity } from '../../../../models/models'

@Component({
    selector: 'page-activity',
    templateUrl: 'activity.html'
})
export class ActivityPage {
    activity: Activity ;

  constructor(public params: NavParams){
    // userParams is an object we have in our nav-parameters
    this.activity = this.params.get('activity');
    console.log(this.activity)
  }

}
