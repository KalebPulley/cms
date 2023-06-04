import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.modle';
import { Contacts } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  // contacts: Contact[] = [
  //   new Contact("2", 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 
  //   "../../assets/images/jacksonk.jpg"
  //   , [])
  //   , new Contact("1", 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 
  //   "../../assets/images/barzeer.jpg"
  //   , [])

  // ];
// selected: Contact = this.contacts[0];
selectedContact: Contact;

constructor(private Contacts: Contacts) {}

ngOnInit(){
  this.Contacts.selectedContactEvent.subscribe((contact: Contact) => {
    this.selectedContact = contact;
  });
}

// @Output() selection = this.selected;
// @Output() contactList = this.contacts;


}
