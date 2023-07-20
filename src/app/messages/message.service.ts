import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  newMessageEvent = new EventEmitter<Message[]>();
  selectedMessage = new EventEmitter<Message>();
  messageListChangedEvent = new Subject<Message[]>();

  messages: Message[] = [];

  private msgURL = 'http://localhost:3000/api/messages';
  maxMessageId: any;

  constructor(private http: HttpClient) { 
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }
  getMessages(): Message[] {
   //return this.messages.slice();
   this.http
    .get<{message: string, messages: any[]}>(this.msgURL)
    .pipe(map((messageData) => {
      return messageData.messages.map((message: { subject: any; msgText: any; _id: any; sender: any}) => {
        return {
          subject: message.subject,
          msgText: message.msgText,
          sender: message.sender,
          id: message._id
        }
      });
    }))
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
    const messagesend: any = { id: message.id, subject: message.subject, msgText: message.msgText, sender: message.sender };
    this.http
    .post<{ message: string, messageId: string }>("http://localhost:3000/api/messages", message)
    .subscribe(responseData =>{
      const id = responseData.messageId;
      message.id = id;
      this.messages.push(message);
      this.messageListChangedEvent.next([...this.messages]);
      this.getMessages();
    });
  }

  deleteMessage(messageId: string){
    console.log("delete entered");
    
    this.http.delete("http://localhost:3000/api/messages/" +  messageId)
    .subscribe(() => {
      const updatedmessages = this.messages.filter(message => message.id !== messageId);
      this.messages = updatedmessages;
      this.messageListChangedEvent.next([...this.messages]);
    });
    this.getMessages();
  }

    updateMessage(originalmessage: Message, newmessage: Message) {
      //const message: any = { id: originalmessage.id, title: newmessage.title, content: newmessage.content };
      this.addMessage(newmessage);
      this.deleteMessage(originalmessage.id);
      this.getMessages();
  }

}
