import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Post } from '../post.model';
import { PostsService } from '../posts.service';

// decorator
@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enteredTitle = ''
  enteredContent = ''
  constructor(public postsService : PostsService) {}

  onAddPost(form: NgForm){
    if(!form.valid){
      return;
    }
    var post : Post = {
      id : null,
      title: form.value.title,
      content: form.value.content
    };
    this.postsService.addPost(post);
    form.reset();
  }

}
