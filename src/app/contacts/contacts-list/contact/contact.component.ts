import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../contact.modle';
import { ContactsListComponent} from '../contacts-list.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() contact;
  @Output() selectedContact = new EventEmitter<number>();

  selecter(value: number) {
    this.selectedContact.emit(value)
  }

}
