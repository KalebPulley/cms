import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.modle';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() contact: Contact;
  

  

}
