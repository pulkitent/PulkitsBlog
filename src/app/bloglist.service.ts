import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

const BASE_URL = 'http://localhost:3000/blogsData?_sort=id&_order=desc';
const header = {headers: new Headers({'Content-Type': 'application/json'})}

@Injectable()
export class BloglistService {

  constructor(private http: Http) { }

  filterData(tag){
    var data=localStorage.getItem('logindata');
    let userid = JSON.parse(data).loginnedId;
    if(tag === 'MYBLOGS'){
      return this.http.get('http://localhost:3000/blogsData?userId='+userid+'&_sort=id&_order=desc')
        .map(res => res.json());
    }
    else {
      return this.http.get('http://localhost:3000/blogsData?tag=' + tag + '&_sort=id&_order=desc')
        .map(res => res.json());
    }
  }

  editData(blog){
    return this.http.patch('http://localhost:3000/blogsData/'+blog.id,blog,header);
  }

  getData(id){
    return this.http.get('http://localhost:3000/blogsData?id='+id)
      .map(res => res.json());

  }

  loadData() {
    return this.http.get(BASE_URL)
      .map(res => res.json())
  }

  postData(data) {
    return this.http.post(BASE_URL,data, header)
      .map(res => res.json())

  }

  deleteData(id){
    return this.http.delete('http://localhost:3000/blogsData/'+id)
      .map(res => res.json())
  }

  updateData(data) {
    return this.http.patch(`BASE_URL${data.id}`,data, header)
      .map(res => res.json())
  }

  checkData(data) {
    return data.id?this.updateData(data): this.postData(data)
      .map(res => res.json())
  }

}
