import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {BlogListComponent} from "./blog-list/blog-list.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent{

  currentBlog :Object;
  searchedTag : string;
  title: string = 'Pulkits Blogging App';
  filterByList: string[] = ["MyBlogs", "Technology", "Science","Food",  "Sports","Cars"];
  constructor(public router: Router){}
  logout(){
    localStorage.setItem('logindata', JSON.stringify({loginnedId:0}));
  }
 //@ViewChild(BlogListComponent) private child: BlogListComponent;
  //filterByTags(listitem: string){
   // console.log(listitem);
  //}
}
