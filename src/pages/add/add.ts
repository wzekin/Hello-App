import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Activity } from '../../models/models'

@Component({
    selector: 'page-add',
    templateUrl: 'add.html'
})
export class AddPage {
    activity: Activity ;

    constructor(public navCtrl: NavController) {

    }

}
