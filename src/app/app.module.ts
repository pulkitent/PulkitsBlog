import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BloglistService} from "./bloglist.service";
import { AppComponent } from './app.component';
import { PopularBlogsComponent } from './popular-blogs/popular-blogs.component';
import { AddNewBlogComponent } from './add-new-blog/add-new-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { FilteredListByTagsComponent } from './filtered-list-by-tags/filtered-list-by-tags.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import {LoginService} from "./login.service";

@NgModule({
  declarations: [
    AppComponent,
    PopularBlogsComponent,
    AddNewBlogComponent,
    BlogListComponent,
    FilteredListByTagsComponent,
    LoginComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponentComponent},
      {path: 'home', component: BlogListComponent},
      {path: 'edit', component: AddNewBlogComponent},
      {path: 'filter/:tag', component: FilteredListByTagsComponent},
      {path: 'addBlog', component: AddNewBlogComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  providers: [BloglistService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
