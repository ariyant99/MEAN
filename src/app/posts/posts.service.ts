import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; //this is used for change detection

import { Post } from './post.model';

@Injectable({providedIn : 'root'})
export class PostsService{
  private posts : Post[] =[];
  private postsUpdated = new Subject<Post[]>();

  getPosts(){
    return [...this.posts]
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable() //this will return the current value stored in variable(postsUpdated)
  }

  addPost(post : Post){
    this.posts.push(post);
    this.postsUpdated.next(this.posts); //this will have the updated value in the variable(postsUpdated)
  }
}
