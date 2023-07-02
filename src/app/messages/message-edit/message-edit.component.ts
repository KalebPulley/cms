import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  //@Output() addMessgeEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  currentSender: string = '5';

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const message = new Message('1', subject, msgText, this.currentSender);
    this.messageService.addMessage(message);
  }

  onClear() {
    console.log('onClear');

    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
