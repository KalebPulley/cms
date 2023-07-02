import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  newMessageEvent = new EventEmitter<Message[]>();
  selectedMessage = new EventEmitter<Message>();
  messageListChangedEvent = new Subject<Message[]>();

  messages: Message[] = [];

  private msgURL = 'https://wdd430backend-default-rtdb.firebaseio.com/messages.json';
  maxMessageId: any;

  constructor(private http: HttpClient) { 
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }
  getMessages(): Message[] {
   //return this.messages.slice();
   this.http
    .get<Message[]>(this.msgURL)
    .subscribe((msg: Message[]) => {
      this.messages = msg;
      this.maxMessageId = this.getMaxId();
      this.messages.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.messageListChangedEvent.next(this.messages.slice());
  });
  return this.messages.slice();
  }

  storeMessages() {
    this.http
    .put(this.msgURL, JSON.stringify(this.messages), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .subscribe(() =>{
      this.messages.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.messageListChangedEvent.next(this.messages.slice());
    });
  }

  getMaxId(): any {
    let maxId = 0;
    this.messages.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    return maxId;
  }

  getMessage(id: string): Message {
    return this.messages.find((c) => c.id === id);
  }

  addMessage(message: Message) {
    if (message === null || message === undefined) return;
    this.maxMessageId++;
    message.id = `${this.maxMessageId}`;
    this.messages.push(message);
    this.storeMessages();
  }

}
