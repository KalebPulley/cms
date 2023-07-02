import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message: Message;

  messageSender: string;

  constructor(private contactServace: ContactService){}

  ngOnInit(): void{
    this.messageSender = this.contactServace.getContact(
      this.message.sender
    ).name;
  }

}
