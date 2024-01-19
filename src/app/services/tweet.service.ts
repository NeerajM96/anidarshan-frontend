import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface UserTweet{
  data: [
    {
      title:string
      tweetedAt:Date
      content:string
      likes:number
      dislikes:number
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private apiUrl = 'http://localhost:8000/api/v1/tweets/';
  constructor(private http:HttpClient) {

   }

   getUserTweets(userId:string){
    const endPoint = this.apiUrl + `user/${userId}`
    console.log(endPoint)
    return this.http.get<UserTweet>(endPoint)
   }
}
