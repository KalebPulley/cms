import { Component
  , Output
  , EventEmitter
  , Input } from '@angular/core';
import { Contact } from '../contact.modle';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';



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
  
  subscription: Subscription;
  term: string = '';

selectedContact = Contact;
//@Output selectedContact

//@Output() selectedContactEvent = new EventEmitter<Contact>();
  

constructor(private ContactSer: ContactService) {}

ngOnInit(){
  this.contacts =  this.ContactSer.getContacts();
  this.subscription = this.ContactSer.contactListChangedEvent.subscribe(
    (contacts: Contact[]) => {
      this.contacts = contacts;
    }
  );
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

search(value: string){
  this.term = value;
}
}
