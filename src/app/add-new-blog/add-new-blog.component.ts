import {Component, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
import {BloglistService} from "../bloglist.service";
import {Router} from "@angular/router";
import {LoginComponentComponent} from "../login-component/login-component.component";
import {LoginService} from "../login.service";


@Component({
  selector: 'app-add-new-blog',
  templateUrl: './add-new-blog.component.html',
  styleUrls: ['./add-new-blog.component.css'],
  providers: [LoginComponentComponent]
})
export class AddNewBlogComponent implements OnInit {
  _TITLE : string;
  _DESCRIPTION : string;
  _BLOGC :string;
  get TITLE() : string{
    return this._TITLE;
  }
  set TITLE(value: string){
    this._TITLE = value;
    console.log(this._TITLE)
  }
  get DESCRIPTION() : string{
    return this._DESCRIPTION;
  }
  set DESCRIPTION(value: string){
    this._DESCRIPTION = value;
    console.log(this._DESCRIPTION)
  }
  get BLOGC() : string{
    return this._BLOGC;
  }
  set BLOGC(value: string){
    this._BLOGC = value;
    console.log(this._BLOGC)
  }

  //@Output() addcurrentBlog:  EventEmitter<Object>= new EventEmitter<Object>();
  blogs : Object[];
  blognew : Object;
  blogedit: Object = {
    name: "",
    desc: "",
    tag: "",
    blogC: "",
    userId : null ,
    id: null,
    postedBy : ""
  };
  constructor(private request: BloglistService, private reqforuser : LoginService ,public router: Router, private login: LoginComponentComponent){ }
  ngOnInit(){
    this.request.getData(this.blogid)
      .subscribe((data) => {
      this.blogedit = data[0];
      console.log(this.blogedit);
    })
    this.request.loadData()
      .subscribe((data) => {
        this.blogs = data;
        console.log(this.login.sendData);
      })
  }
  userName : string;
  blogdata = localStorage.getItem('blogUpdateData');
  blogid = JSON.parse(this.blogdata).blogId;
  addBlog(name, desc, tag, blogC) {
    var data=localStorage.getItem('logindata');
    let userid = JSON.parse(data).loginnedId;
    this.reqforuser.getUserById(userid)
      .subscribe((data) => {
          this.userName = data[0].username;
          console.log(data[0].username);
        let blog = {
          name: name,
          desc: desc,
          tag : tag,
          blogC: blogC,
          userId : userid,
          postedBy : this.userName
        };
        console.log(tag);
        console.log(userid);
        //  this.addcurrentBlog.emit(blog);
        this.request.postData(blog)
          .subscribe(data => {
            console.log(data);
            this.blogs.push(data);
          });
        console.log(this.userName +"bgg");
        location.href = "home";
      })
      console.log(this.userName +"bgg");
    // let userid =  this.login.loginUserId;


  }
  editBlog(tag){

    var data=localStorage.getItem('logindata');
    let userid = JSON.parse(data).loginnedId;
    let blog = {
      id: this.blogid,
      name: this._TITLE,
      desc: this._DESCRIPTION,
      tag : tag,
      blogC : this._BLOGC,
      userId : userid
    };
    this.request.editData(blog)
      .subscribe(data => {
        location.href = "home";
      })
  }

}
