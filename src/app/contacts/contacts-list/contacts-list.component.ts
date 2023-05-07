import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Contact } from '../contact.modle';


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
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
@Input() contacts;

selectedContact = 0;
//@Output selectedContact
changeSelected(id: number){
  this.selectedContact = id;
  console.log(id);
  
}
@Output() selectedCont = new EventEmitter<number>();
  
autoContact(value: number) {
  this.selectedCont.emit(value)
}

@Output() notifyGrandParent= new EventEmitter();
childEvent(event) {
  this.notifyGrandParent.emit('event')
}
}