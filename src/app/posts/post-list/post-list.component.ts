import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector : 'app-post-list',
  templateUrl : 'post-list.component.html',
  styleUrls : ['post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  posts : Post[] =[]
  private postsSub: Subscription;
  //this will help when the page is not required as if it stays it will cause memory leak

  constructor(public PostsService : PostsService ) {}

  ngOnInit() {
    this.PostsService.getPosts()
    this.postsSub = this.PostsService.getPostUpdateListener()
      .subscribe((posts: Post[]) =>{
        this.posts = posts;
      })
    //.subscribe is mandatory as we are returning a subject.
    // it take 3 arguments return_value, error, when finished(next(), error(), complete())
  }

  onDelete(postId) {
    this.PostsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
