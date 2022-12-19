import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  public posts;

  constructor() {
    if (localStorage) {
      let postsJSON = localStorage.getItem('Posts');
      console.log(postsJSON);
      if (postsJSON) {
        console.log('postsJSON exists');
        this.posts = JSON.parse(localStorage.getItem('Posts'));
        console.log(this.posts);
      } else {
        localStorage.setItem('Posts', '[]');
        alert('No posts have been made yet.');
      }
    } else {
      console.log('no local storage');
    }
  }

  getPost(postId: String) {
    for (let i = 0; i < this.posts.length; i++) {
      const element = this.posts[i];
      if (element.id == postId) {
        return element;
      }
    }
  }

  addNewPost(data: object) {
    this.posts.push(data);

    //add object to local storage
    localStorage.setItem('Posts', JSON.stringify(this.posts));
    console.log(this.posts);
  }

  editPost(postId: String, updatedPost: object) {
    for (let i = 0; i < this.posts.length; i++) {
      let element = this.posts[i];
      if (element.id == postId) {
        this.posts[i] = updatedPost;
      }
    }
    localStorage.setItem('Posts', JSON.stringify(this.posts));
  }

  deletePost(postId: String) {
    for (let i = 0; i < this.posts.length; i++) {
      const element = this.posts[i];
      if (element.id == postId) {
        this.posts.splice(i, 1);
      }
    }
    localStorage.setItem('Posts', JSON.stringify(this.posts));
  }
}
