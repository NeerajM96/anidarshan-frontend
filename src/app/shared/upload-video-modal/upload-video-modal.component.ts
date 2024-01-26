import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-video-modal',
  templateUrl: './upload-video-modal.component.html',
  styleUrls: ['./upload-video-modal.component.scss']
})
export class UploadVideoModalComponent {

  uploadForm = this.fb.group({
    video:[null, Validators.required],
    thumbnail:[null, Validators.required],
    title:['', Validators.required],
    description:['', Validators.required],
  })

  constructor(private fb:FormBuilder){

  }
}
