import { Component, Input } from '@angular/core';
import { Contact } from '../contact.modle';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent {
  // contacts: Contact[] = [
  //   new Contact("2", 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 
  //   "../../assets/images/jacksonk.jpg"
  //   , [])
  //   , new Contact("1", 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 
  //   "../../assets/images/barzeer.jpg"
  //   , [])

  // ];

  @Input() contact: Contact;
}
