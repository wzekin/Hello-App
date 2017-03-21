import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Activity, Jion } from './models';

const url: string = 'http://127.0.0.1:8080/message/'

@Injectable()
export class ActivityService {
    constructor(private http: HTTP) { }
    getActivities(): Promise < Activity[] > {
            return this.http.get(url + 'teacher/activities',{}, { withCredentials: true })
                .then(response => response.data as Activity[])
                .catch(handleError);
        }
        // addActivity(activity:Activity):void{
        //    this.http.put('http://127.0.0.1:8080/message').toPromise().catch(this.handleError)
        //}
    addActivity(a: Activity): void {
        this.http.post(url + 'teacher/add',{
            Name:a.Name,
            Introduction:a.Introduction,
            Date:a.Date,
        }, { withCredentials: true })
            .catch(handleError)
    }
    delActivity(id: number): void {
        this.http.get(url + `teacher/del`,{'id':id}, { withCredentials: true })
            .catch(handleError)
    }
    getClass(grade: string): Promise < string[] > {
        return this.http.get(url + 'teacher/getclass' , {'grade':grade},{ withCredentials:true})
            .then(response => response.data as string[])
            .catch(handleError)
    }
    addStu(a:Activity,studentId:string):void{
        this.http.post(url + 'teacher/addstu',{'name':studentId,'activityId':a.Id},{withCredentials:true})
            .catch(handleError)
    }
    endActivity(a:Activity):void{
        this.http.post(url+'teacher/accept',{'id':a.Id,'score':a.Id,'impression':a.Impression,'img':a.ImagePath},{withCredentials:true})
            .catch(handleError)
    }
    /*getStudent(grade:string): Promise < string[] >{
        return this.http.get(url + 'teacher/getstudent',{'grade':grade},{withCredentials:true})
            .then(response => response.data as string[])
    }*/
}

@Injectable()
export class JionService {
    constructor(private http: HTTP) {}
    getJions(id): Promise < Jion[] > {
        return this.http.get(url + `teacher/activity`,{'id':id}, { withCredentials: true })
            .then(response => response.data as Jion[])
            .catch(handleError)
    }
    setStatus(jion:Jion): void {
        this.http.post(url+ 'teacher/set',{'jion':jion.Id,'status':jion.Status},{withCredentials:true})
            .catch(handleError)
    }
}

function handleError(error: any): Promise < any > {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
}
