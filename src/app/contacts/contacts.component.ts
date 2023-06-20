import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.modle';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

selectedContact: Contact;

constructor(private Contacts: ContactService) {}

ngOnInit(){
  this.Contacts.selectedContactEvent.subscribe(
    (contact: Contact) => {
    this.selectedContact = contact;
  });
}

// @Output() selection = this.selected;
// @Output() contactList = this.contacts;


}
