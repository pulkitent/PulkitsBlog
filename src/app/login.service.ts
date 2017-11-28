import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

const BASE_URL = 'http://localhost:3000/users';
const header = {headers: new Headers({'Content-Type': 'application/json'})}

@Injectable()
export class LoginService {

  constructor(private http: Http) { }
  postData(data) {
    return this.http.post(BASE_URL,data, header)
      .map(res => res.json())
  }
  loadData() {
    return this.http.get(BASE_URL)
      .map(res => res.json())
  }

  getUserById(id){

    return this.http.get(BASE_URL+"?id="+id)
      .map(res => res.json());
  }

  LoginAccess(username, password) {
    return this.http.get(BASE_URL).map((res)=>
    {  
      console.log(res.json());
      var obj = res.json();
      var retobj = obj.filter(function (item) {
        if(item.username == username && item.password == password){
          console.log(item);
          return item;
        }
      });
      console.log(retobj +"   "+username);
      if(retobj.length == 0){
        console.log(username)
        return username;
      } 
      else {
        console.log(retobj[0]);
        return retobj[0];
      }
    });
  }
}
