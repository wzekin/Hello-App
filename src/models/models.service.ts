///<reference path="../../node_modules/@angular/http/src/http.d.ts"/>
import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {HTTP} from '@ionic-native/http'
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Activity, Jion, Score, Student} from './models';
import {Storage} from '@ionic/storage';

const url: string = 'http://192.168.3.12:8080/message/';

@Injectable()
export class ActivityService {
  constructor(private http: Http,
              private Http: HTTP,
              private storage: Storage,
              private platform: Platform) {
  }

  getActivities(): Promise<Activity[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}teacher/activities`, {'status':'now'}, {Cookie: val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === '成功！') {
              return data.Data;
            }
          })
      })

    } else {
      return this.http.get(`${url}teacher/activities?status=now`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === '成功！') {
            return response.json().Data;
          }
        })
        .catch(handleError);
    }
  }

  // addActivity(activity:Activity):void{
  //    this.http.put('http://127.0.0.1:8080/message').toPromise().catch(this.handleError)
  //}
  addActivity(a: Activity): void {
    if (this.platform.is('android')) {
      this.storage.get('cookie').then(val => {
        this.Http.get(`${url}teacher/add`, {Name: a.Name, Introduction: a.Introduction, date: a.Date}, {'Cookie': val})
      })
    } else {
      this.http.get(`${url}teacher/add?Name=${a.Name}&Introduction=${a.Introduction}&date=${a.Date}`, {'withCredentials': true})
        .toPromise()
        .catch(handleError)
    }
  }

  delActivity(id: number): void {
    if (this.platform.is('android')) {
      this.storage.get('cookie').then(val => {
        this.Http.get(`${url}teacher/del`, {id: id}, {'Cookie': val})
      })
    } else {
      this.http.get(`${url}teacher/del?id=${id}`, {withCredentials: true})
        .toPromise()
        .catch(handleError)
    }
  }

  getClass(grade: string): Promise<string[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}teacher/getclass`, {grade: grade}, {'Cookie': val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === "成功！") {
              return data.Data;
            }
          })
      })
    } else {
      return this.http.get(url + `teacher/getclass?grade=${grade}`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
        .catch(handleError)
    }
  }

  addStu(activityId: string, studentId: string): void {
    if (this.platform.is('android')) {
      this.storage.get('cookie').then(val =>{
        this.Http.get(`${url}teacher/addStu`, {name: studentId, activityId: activityId}, {Cookie:val})
      })
    } else {
      this.http.get(url + `teacher/addStu?name=${studentId}&activityId=${activityId}`, {withCredentials: true})
        .toPromise()
        .catch(handleError)
    }
  }

  endActivity(a: Activity): void {
    console.log(a)
    if (this.platform.is('android')) {
      this.storage.get('cookie').then(val =>{
        this.Http.post(`${url}teacher/accept`, {
          id: a.Id,
          score: a.Score,
          impression: a.Impression,
          img: a.ImagePath,
        }, {Cookie:val})
      })
    } else {
      this.http.post(url + 'teacher/accept', JSON.stringify({
        'id': a.Id,
        'score': a.Score,
        'impression': a.Impression,
        'img': a.ImagePath
      }), {withCredentials: true})
        .toPromise()
        .catch(handleError)
    }
  }

  getStudent(grade: string, classes: string): Promise<Student[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val=>{
        return this.Http.get(`${url}teacher/getstudent`, {
          grade: grade,
          class: classes,
        }, {'Cookie':val})
      })
        .then(response => {
          let data = JSON.parse(response.data);
          if (data.Message === '成功！') {
            return data.Data;
          }
        })
    } else {
      return this.http.get(`${url}teacher/getstudent?grade=${grade}&class=${classes}`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
    }
  }

  getEndActivities(): Promise<Activity[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}teacher/activities`, {}, {Cookie: val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === '成功！') {
              return data.Data;
            }
          })
      })
    } else {
      return this.http.get(url + 'teacher/activities', {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
        .catch(handleError)
    }
  }

  getScore(grade: string, classes: string): Promise<Score[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}teacher/score`, {grade: grade, class: classes}, {Cookie: val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === '成功！') {
              return data.Data;
            }
          })
      })
    } else {
      return this.http.get(`${url}teacher/score?grade=${grade}&class=${classes}`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
    }
  }
}

@Injectable()
export class JionService {
  constructor(private http: Http,
              private Http: HTTP,
              private storage:Storage,
              private platform: Platform) {
  }

  getJions(id): Promise<Jion[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}teacher/activity`, {id: id}, {Cookie: val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === "成功！") {
              return data.Data;
            }
          })
      })
    } else {
      return this.http.get(`${url}teacher/activity?id=${id}`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
        .catch(handleError)
    }
  }

  setStatus(jion: Jion): void {
    if (this.platform.is('android')) {
      this.storage.get('cookie').then(val => {
        this.Http.get(`${url}teacher/set`, {jionid: jion.Id, status: jion.Status}, {Cookie: val})
      })
    } else {
      this.http.get(url + `teacher/set?jionid=${jion.Id}&status=${jion.Status}`, {withCredentials: true})
        .toPromise()
        .catch(handleError)
    }
  }
}

@Injectable()
export class StudentService {
  constructor(private http: Http,
              private Http: HTTP,
              private storage:Storage,
              private platform: Platform) {
  }


  getStudent(): Promise<Student> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}student`, {}, {Cookie: val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === "成功！") {
              return data.Data;
            }
          })
      })
    } else {
      return this.http.get(`${url}student`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
    }
  }

  getCanjia(): Promise<Jion[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}student/canjia`, {}, {Cookie: val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === "成功！") {
              return data.Data;
            }
          })
      })
    } else {
      return this.http.get(`${url}student/canjia`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
    }
  }

  getRoot(): Promise<Activity[]> {
    if (this.platform.is('android')) {
     return this.storage.get('cookie').then(val => {
       return this.Http.get(`${url}student/activity`, {'who':'root'}, {Cookie: val})
         .then(response => {
           let data = JSON.parse(response.data);
           if (data.Message === "成功！") {
             return data.Data;
           }
         })
     })
    } else {
      return this.http.get(`${url}student/activity?who=root`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
    }
  }

  getClass(): Promise<Activity[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}student/activity`, {'who':'class'}, {Cookie: val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === "成功！") {
              return data.Data;
            }
          })
      })
    } else {
      return this.http.get(`${url}student/activity?who=class`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
    }
  }

  getGrade(): Promise<Activity[]> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}student/activity`, {'who':'grade'}, {Cookie: val})
          .then(response => {
            let data = JSON.parse(response.data);
            if (data.Message === "成功！") {
              return data.Data;
            }
          })
      })
    } else {
      return this.http.get(`${url}student/activity?who=grade`, {withCredentials: true})
        .toPromise()
        .then(response => {
          if (response.json().Message === "成功！") {
            return response.json().Data
          }
        })
    }
  }

  setJion(activityid: string,): Promise<string> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}student/jion`, {activity_id: activityid}, {Cookie: val})
          .then(response => JSON.parse(response.data).Message as string
          )
      })
    }else {
      return this.http.get(`${url}/student/jion?activity_id=${activityid}`, {withCredentials: true})
        .toPromise()
        .then(response => response.json().Message as string)
    }
  }
}

@Injectable()
export class OtherService {
  constructor(private http: Http,
              private Http: HTTP,
              private storage: Storage,
              private platform: Platform,) {
  }

  login(username: string, password: string, select: string): Promise<string> {
    if (this.platform.is('android')) {
      return this.Http.get(`${url}login`, {
        select: select,
        password: password,
        username: username,
      },{})
        .then(response => {
          let data = JSON.parse(response.data);
          this.storage.set('cookie', `beegosessionID=${data.Data}`);
          return data.Message;
        })
    } else {
      return this.http.get(`${url}login?select=${select}&password=${password}&username=${username}`,
        {withCredentials: true})
        .toPromise()
        .then(response => {
          return response.json().Message
        })
    }
  }

  exit(): void {
    if (this.platform.is('android')) {
      this.Http.get(`${url}exit`, {}, {})
    } else {
      this.http.get(`${url}exit`, {withCredentials: true})
    }
    this.storage.remove('cookie');
    console.log("exit!")
  }

  change(ps1: string, ps2: string): Promise<string> {
    if (this.platform.is('android')) {
      return this.storage.get('cookie').then(val => {
        return this.Http.get(`${url}student/change`, {password: ps1, newpassword: ps2}, {Cookie: val})
          .then(response => JSON.parse(response.data).Message as string)
      })
    } else {
      return this.http.get(`${url}student/change?password=${ps1}&newpassword=${ps2}`,
        {withCredentials: true})
        .toPromise()
        .then(response => response.json().Message as string)
    }
  }

  text(): Promise<string> {
    return this.storage.get('cookie').then(val =>{
      return this.Http.get(`${url}text`,{},{Cookie:val})
        .then(response => JSON.parse(response.data).Message as string)
    })
  }
}

function handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

