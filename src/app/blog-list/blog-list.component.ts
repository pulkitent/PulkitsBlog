import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AddNewBlogComponent} from "../add-new-blog/add-new-blog.component";
import {Router} from "@angular/router";
import { BloglistService } from '../bloglist.service';
import { LoginService} from "../login.service";
import { IBlogInterface } from './blog.Interface';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit{
  _listFilter: string;
  blogs : IBlogInterface[];
  searchedBlogs: IBlogInterface[];
  get listFilter() : string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.searchedBlogs = this.listFilter ? this.performFilter(this.listFilter): this.blogs;
  }
  ngOnInit(){
    this.blogListService.loadData()
      .subscribe((data)=>{
      console.log(data);
        this.blogs = data;
        this.searchedBlogs = this.blogs;
        console.log(this.blogs)
        //console.log(this.blogs);
      })
  }

  constructor(private blogListService : BloglistService, private router: Router) {

  }
  performFilter(filterBy: string): IBlogInterface[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.blogs.filter((blog : IBlogInterface) =>
      blog.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  filterByTag(listItem: string){
    console.log(listItem);
    listItem = listItem.toLocaleLowerCase();
    return this.blogs.filter((blog : IBlogInterface) =>
      blog.tag.toLocaleLowerCase().indexOf(listItem) !== -1);
  }



}
