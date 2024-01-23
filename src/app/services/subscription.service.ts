import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8000/api/v1/subscriptions/';
  constructor(private http:HttpClient) { }

  toggleChannelSubscription(channelId:string){
    const endPoint = this.apiUrl + `c/${channelId}`
    return this.http.post(endPoint,{})
  }
}
