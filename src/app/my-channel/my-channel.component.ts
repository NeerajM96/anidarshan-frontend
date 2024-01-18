import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user/user.model';
import { Subscription } from 'rxjs';
import { DataStoreService } from '../services/data-store.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-channel',
  templateUrl: './my-channel.component.html',
  styleUrls: ['./my-channel.component.scss'],
})
export class MyChannelComponent implements OnInit, OnDestroy {
  user: Subscription | undefined;
  isAuthenticated: boolean = false;
  accessToken = '';

  fullName = '';
  username = '';
  avatar = '';
  coverImage = '';
  subscribersCount = 0;
  isSubscribed = false;
  channelsSubscribedTo = 0;

  constructor(
    private dataStore: DataStoreService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserState().subscribe((currentUser) => {
      console.log('User: ', currentUser);
      this.username = currentUser.username || this.route.snapshot.paramMap.get('id');
    });
    this.accessToken = this.authService.getAccessToken();
    this.getChannelDetails();
  }

  ngOnDestroy(): void {
    this.user?.unsubscribe();
  }

  getChannelDetails() {
    const channelToSearchUsername = this.username;
    this.authService.getChannelInfo(channelToSearchUsername).subscribe((res) => {
      console.log(`Channel info for user: ${channelToSearchUsername}: `, res.data);
      this.fullName = res.data.fullName
      this.username = res.data.username
      this.isSubscribed = res.data.isSubscribed
      this.subscribersCount = res.data.subscribersCount
      this.channelsSubscribedTo = res.data.channelsSubscribedTo
      this.avatar = res.data.avatar
      this.coverImage = res.data.coverImage
    });
  }
}
