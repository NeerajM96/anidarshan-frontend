import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit{
  thumbnail:string = 'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  duration:string = '20:45'
  channelIcon:string = 'http://res.cloudinary.com/dqvwtmjbb/image/upload/v1705576838/o2sid2hwlsqq7mjmajob.jpg'
  title:string = 'JavaScript Fundamentals: Variables and Data Types'
  viewCount:string = '10.3k'
  uploadedAt:string = '40 minutes ago'
  channelName:string = 'Chai Aur Code'

  // onMyChannelPage:boolean = true  // hides channel name and icon when I am on my page.
  ngOnInit(): void {
    
  }

}
