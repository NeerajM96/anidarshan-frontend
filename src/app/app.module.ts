import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { MyChannelComponent } from './my-channel/my-channel.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { SignupComponent } from './signup/signup.component';
import { VideoCardComponent } from './videos/video-card/video-card.component';
import { VideosComponent } from './videos/videos.component';
import { TweetsComponent } from './tweets/tweets.component';
import { TweetCardComponent } from './tweets/tweet-card/tweet-card.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    LoaderComponent,
    MyChannelComponent,
    SignupComponent,
    VideoCardComponent,
    VideosComponent,
    TweetsComponent,
    TweetCardComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  // multi:true means, since we can have multiple interceptors in the app, so don't overwrite exisiting interceptors 
  // and add it as an additional one instead and the internals will be handled by HttpClient
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
