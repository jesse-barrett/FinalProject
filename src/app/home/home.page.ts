import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public posts;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.posts = this.blogService.posts;
  }

  addNewPost() {
    console.log('wow');
  }

  async logOut() {
    await this.authService.logOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  @ViewChild(IonModal) modal: IonModal;
  title: string;
  content: string;

  //close the modal and cancel the post
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  //close the modal and submit the post
  confirm() {
    let newId = String(this.posts.length);
    let newPost = {
      id: newId,
      title: this.title,
      content: this.content,
    };

    this.blogService.addNewPost(newPost);

    this.title = '';
    this.content = '';
    this.modal.dismiss(null, 'confirm');
  }
}
