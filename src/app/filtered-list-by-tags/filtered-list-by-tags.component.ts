import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {BloglistService} from "../bloglist.service";
import {IBlogInterface} from "../blog-list/blog.Interface";


@Component({
  selector: 'app-filtered-list-by-tags',
  templateUrl: './filtered-list-by-tags.component.html',
  styleUrls: ['./filtered-list-by-tags.component.css']
})
export class FilteredListByTagsComponent implements OnInit {
  private tag;
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

  constructor(private route: ActivatedRoute,
              private router: Router, private blogListService: BloglistService) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.tag = params;
    });
    console.log(this.tag.tag);
    this.blogListService.filterData(this.tag.tag.toUpperCase())
      .subscribe((data)=>{
        this.blogs = data;
        this.searchedBlogs = this.blogs;
        console.log(this.searchedBlogs);
        console.log(this.blogs);
      });
  }
  deleteIt(id : number){
    this.blogListService.deleteData(id)
      .subscribe((data) => {
        this.blogs = data;
        this.searchedBlogs = this.blogs;
      })
    location.href = '/filter/MyBlogs';
  }

  idForUpdate(id : number){
    localStorage.setItem('blogUpdateData',JSON.stringify({blogId:id}));
  }

  performFilter(filterBy: string): IBlogInterface[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.blogs.filter((blog : IBlogInterface) =>
      blog.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

}
