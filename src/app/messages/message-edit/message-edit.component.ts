import { Component
  , Output
  , EventEmitter
  , ViewChild
, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @Output() addMessgeEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  currentSender: string = 'Kaleb';

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const message = new Message('1', subject, msgText, this.currentSender)
    this.addMessgeEvent.emit()
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
