import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; //this is used for change detection
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

@Injectable({providedIn : 'root'})
export class PostsService{
  private posts : Post[] =[];
  private postsUpdated = new Subject<Post[]>();

  constructor(public http: HttpClient) {}

  getPosts(){
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=> {
      this.posts=postData.posts;
      this.postsUpdated.next([...this.posts])
    })
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable() //this will return the current value stored in variable(postsUpdated)
  }

  addPost(post : Post){
    this.http.post('http://localhost:3000/api/posts', post)
    .subscribe((responseData: any) =>{
      console.log(responseData.message);
      this.posts.push(post);
      //this will have the updated value in the variable(postsUpdated)
      this.postsUpdated.next(this.posts);
    })
  }
}
