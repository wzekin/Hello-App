import {Component} from '@angular/core';

import {ActionSheetController, NavController, NavParams} from 'ionic-angular';

import {Camera, CameraOptions} from "@ionic-native/camera";
import {Activity} from '../../../../../models/models'
import {ActivityService} from '../../../../../models/models.service'

@Component({
  selector: 'page-end',
  templateUrl: 'end.html'
})
export class EndPage {
  activity: Activity = new Activity;
  activities : Activity[];
  constructor(
    public navCtrl: NavController,
    public navParams:NavParams,
    public actionSheetCtrl:ActionSheetController,
    private camera:Camera,
    private activityService:ActivityService
  ) {
    this.activities = this.navParams.get("activities")
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '设置',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.takephoto();
          }
        }, {
          text: '从相册选择',
          handler: () => {
            this.choosePhoto();
          }
        }
      ]
    });
    actionSheet.present();
  }

  deletephoto(index){
    this.activity.ImagePath.splice(index)
  }

  takephoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE

    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.activity.ImagePath.push('data:image/jpeg;base64,' + imageData);
      console.log(this.activity.ImagePath)
    }, (err) => {
      // Handle error
    });
  }

  choosePhoto() {
    let options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.activity.ImagePath.push(imageData);
      alert(imageData);
    }, (err) => {
      // Handle error
    });

  }

  EndActivity():void{
    this.activityService.endActivity(this.activity);
    this.activity = new Activity();
    this.navCtrl.pop()
  }
}
