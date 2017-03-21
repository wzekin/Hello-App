import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Activity, Jion } from '../../models/models'
import { ActivityService, JionService } from '../../models/models.service'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    select:string;
    Activities: Activity[];
    constructor(
        public navCtrl: NavController,
        private activityService: ActivityService,
        private jionService: JionService,
    ) {}

    getActivities(): void {
        this.activityService.getActivities()
            .then(activities => {
                this.Activities = activities;
                for (let i in this.Activities) {
                    let activity = this.Activities[i]
                    this.jionService.getJions(activity.Id)
                        .then(jions => {
                            activity.jions = jions
                        })
                }
            });
    }


    ngAfterViewInit() {
        //this.getActivities()
    }
}
