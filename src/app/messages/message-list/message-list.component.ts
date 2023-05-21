import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[];
  

  constructor(private Messages: MessageService) {}
  
onSelected(message: Message) {
  this.messages = this.Messages.getMessages();
  this.Messages.selectedMessage.emit(message);
}


ngOnInit(){
  this.messages =  this.Messages.getMessages();
  this.messages = this.Messages.getMessages();
    this.Messages.newMessageEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
}

onAddMessage(message: Message) {
  this.messages.push(message)
}

}
