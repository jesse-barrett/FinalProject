import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public post;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.post = this.blogService.getPost(id);
    this.newTitle = this.post.title;
    this.newContent = this.post.content;
  }

  @ViewChild(IonModal) modal: IonModal;
  newTitle: string;
  newContent: string;

  //close the modal and cancel the post
  cancel() {
    this.newTitle = this.post.title;
    this.newContent = this.post.content;
    this.modal.dismiss(null, 'cancel');
  }

  //close the modal and submit the post
  confirm() {
    let newId = this.post.id;
    let newPost = {
      id: this.post.id,
      title: this.newTitle,
      content: this.newContent,
    };

    this.post = newPost;
    this.blogService.editPost(newId, newPost);

    this.newTitle = '';
    this.newContent = '';
    this.modal.dismiss(null, 'confirm');
  }

  async deletePost() {
    await this.blogService.deletePost(this.post.id);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
