import { Component
  , Output
  , EventEmitter
  , Input } from '@angular/core';
import { Contact } from '../contact.modle';
import { Contacts } from '../contact.service';



@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent {
  // contacts: Contact[] = [
  //   new Contact("2", 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 
  //   "../../assets/images/jacksonk.jpg"
  //   , [])
  //   , new Contact("1", 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 
  //   "../../assets/images/barzeer.jpg"
  //   , [])

  // ];

  contacts: Contact[] = [];

selectedContact = Contact;
//@Output selectedContact

//@Output() selectedContactEvent = new EventEmitter<Contact>();
  

onSelected(contact: Contact) {
  this.Contacts.selectedContact.emit(contact);
}

constructor(private Contacts: Contacts) {}

ngOnInit(){
  this.contacts =  this.Contacts.getContacts();
}
}
