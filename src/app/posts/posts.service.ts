import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; //this is used for change detection
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn : 'root'})
export class PostsService{
  private posts : Post[] =[];
  private postsUpdated = new Subject<Post[]>();

  constructor(public http: HttpClient) {}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=> {
      return postData.posts.map(post =>{
        return {
          id: post._id,
          title: post.title,
          content: post.content
        };
      });
    }))
    .subscribe((mapedPost)=> {
      this.posts = mapedPost;
      this.postsUpdated.next([...this.posts])
    })
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable() //this will return the current value stored in variable(postsUpdated)
  }

  addPost(post : Post){
    this.http.post('http://localhost:3000/api/posts', post)
    .subscribe((responseData: any) =>{
      const newPost = {
        id: responseData.postId,
        title: post.title,
        content: post.content
      }
      this.posts.push(newPost);
      //this will have the updated value in the variable(postsUpdated)
      this.postsUpdated.next(this.posts);
    })
  }

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
    console.log("Deleted!!")
    const updatedPost = this.posts.filter(post => post.id !== postId);
    this.posts = updatedPost;
    this.postsUpdated.next(updatedPost);
    })
  }
}
