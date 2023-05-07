import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.modle';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts: Contact[] = [
    new Contact("2", 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 
    "../../assets/images/jacksonk.jpg"
    , [])
    , new Contact("1", 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 
    "../../assets/images/barzeer.jpg"
    , [])

  ];
selected: Contact = this.contacts[0];
selectedContact(cont: number){
  this.selected = this.contacts[cont];
}
@Output() selection = this.selected;
@Output() contactList = this.contacts;


}
