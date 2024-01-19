import { Component, Input, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  @Input()
  channelIcon:string = ''
  @Input()
  channelName:string = ''
  tweetData:any

  userId = ''
  newTweet = new FormControl('', Validators.required);
  // tweetData = [
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '6',
  //     content:'Exploring the latest features in JavaScript ES11! The language keeps evolving. 💡 #JavaScript #ES11',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '7',
  //     content:'Embracing the benefits of TypeScript for stronger, more reliable code. 🚀 #TypeScript #Programming',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '8',
  //     content:'Styling made easy with Tailwind CSS! Rapidly build beautiful, responsive interfaces. 🎨 #TailwindCSS #WebDev',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '9',
  //     content:'Building dynamic user interfaces with React! The go-to library for modern web development. 🚀 #React #WebDev',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '10',
  //     content:'Next.js makes server-side rendering a breeze! Boost your React app \'s performance with ease. 🚀 #Nextjs #React',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '11',
  //     content:'Exploring the latest features in JavaScript ES11! The language keeps evolving. 💡 #JavaScript #ES11',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '12',
  //     content:'Embracing the benefits of TypeScript for stronger, more reliable code. 🚀 #TypeScript #Programming',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '13',
  //     content:'Styling made easy with Tailwind CSS! Rapidly build beautiful, responsive interfaces. 🎨 #TailwindCSS #WebDev',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '14',
  //     content:'Building dynamic user interfaces with React! The go-to library for modern web development. 🚀 #React #WebDev',
  //     likes: 425,
  //     dislikes: 87
  //   },
  //   {
  //     title: 'React Patterns',
  //     tweetedAt: '15',
  //     content:'Next.js makes server-side rendering a breeze! Boost your React app \'s performance with ease. 🚀 #Nextjs #React',
  //     likes: 425,
  //     dislikes: 87
  //   },
  // ]


  constructor(private tweetService:TweetService, private authService:AuthService){

  }
  ngOnInit(): void {
    // if(this.authService.getAuthData().userId){
    //   this.userId = this.authService.getAuthData().userId
    // }
    this.setTweetData()
  }

  setTweetData(){
    const userId = this.authService.getUserId()
    this.tweetService.getUserTweets(userId).subscribe(tweets => {
        this.tweetData = tweets.data
    })
  }

  createNewTweet(){
    if(this.newTweet.valid && this.newTweet.value){
      const tweetContent = this.newTweet.value;
      console.log(tweetContent)
      this.tweetService.createTweet(tweetContent).subscribe(res => {
        console.log("Tweet created successfully: ", res)
        this.insertNewTweetAndClearForm(res)

      })
    }
    console.log(this.newTweet)
  }

  insertNewTweetAndClearForm(res:any){
    const tweet = {
      tweetedAt:res.data.createdAt,
      content:res.data.content
    }
    this.tweetData.push(tweet)
    this.newTweet.reset()
  }

}
