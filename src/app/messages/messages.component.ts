import { Component } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  selectedMessage: Message;

constructor(private Messages: MessageService) {}

ngOnInit(){
  this.Messages.selectedMessage.subscribe((Message: Message) => {
    this.selectedMessage = Message;
  });
}
}
