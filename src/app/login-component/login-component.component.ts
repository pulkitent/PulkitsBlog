import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../login.service";


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private request: LoginService, private router: Router) { }
  users : Object[];
  show : boolean = false;
  loginUserId : number;
  lognotsuccess : boolean = false;
  ngOnInit() {
    this.request.loadData()
      .subscribe((data) => {
        this.users = data;
      })
  }
  @Output() messageEvent = new EventEmitter<string>();
  addUser(username, password) {
    let newuser = {
      username: username,
      password : password
    };
    this.request.postData(newuser)
      .subscribe(data => {
        this.users.push(data);
      });
    this.show = true;
  }
  sendData(id: number){
    this.loginUserId = id;

  }
  checkLogin(username, password) {
    this.request.LoginAccess(username, password)
      .subscribe(data=> {
        if(data.id == null){
          console.log('failed');
          this.lognotsuccess = true;
          username = '';
          password = '';
          this.router.navigateByUrl('/login');
        } else {
          console.log(data.id);
          this.sendData(data.id);
          console.log('Success');
          localStorage.setItem('logindata',JSON.stringify({loginnedId:data.id}));
          this.router.navigateByUrl('/home', data.id);
        }
      });
  }
}
