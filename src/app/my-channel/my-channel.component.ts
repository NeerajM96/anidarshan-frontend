import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user/user.model';
import { Subscription } from 'rxjs';
import { DataStoreService } from '../services/data-store.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-my-channel',
  templateUrl: './my-channel.component.html',
  styleUrls: ['./my-channel.component.scss'],
})
export class MyChannelComponent implements OnInit, OnDestroy {
  user: Subscription | undefined;
  isAuthenticated: boolean = false;
  accessToken = '';
  currTab = 'tweets';
  fullName = '';
  username = '';
  avatar = '';
  coverImage = '';
  subscribersCount = 0;
  isSubscribed = false;
  channelsSubscribedTo = 0;
  userId = '';
  myChannel: boolean = false;

  constructor(
    private dataStore: DataStoreService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserState().subscribe((currentUser) => {
      console.log('User: ', currentUser);
      this.username =
        currentUser.username || this.route.snapshot.paramMap.get('username');
    });
    this.accessToken = this.authService.getAccessToken();
    this.getChannelDetails();
  }

  ngOnDestroy(): void {
    this.user?.unsubscribe();
  }

  getChannelDetails() {
    const channelToSearchUsername = this.username;
    this.authService
      .getChannelInfo(channelToSearchUsername)
      .subscribe((res) => {
        console.log(
          `Channel info for user: ${channelToSearchUsername}: `,
          res.data
        );
        this.fullName = res.data.fullName;
        this.username = res.data.username;
        this.isSubscribed = res.data.isSubscribed;
        this.subscribersCount = res.data.subscribersCount;
        this.channelsSubscribedTo = res.data.channelsSubscribedTo;
        this.avatar = res.data.avatar;
        this.coverImage = res.data.coverImage;
        this.userId = res.data._id;
        this.isMychannel();
      });
  }

  setCurrentTab(tabName: string) {
    this.currTab = tabName;
  }

  isMychannel() {
    const loggedInUserId = this.authService.getUserId();
    if (loggedInUserId != this.userId) {
      this.myChannel = false;
    } else {
      this.myChannel = true;
    }
  }

  onSubscribe() {
    const channelId = this.userId;
    this.subscriptionService
      .toggleChannelSubscription(channelId)
      .subscribe((res) => {
        this.isSubscribed = !this.isSubscribed;
        if (this.isSubscribed) {
          this.subscribersCount += 1;
        } else {
          this.subscribersCount -= 1;
        }
      });
  }
}
