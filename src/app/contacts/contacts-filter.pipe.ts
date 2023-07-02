import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {    
  let searchedArray = contacts.slice().filter((contact)=> {
      contact.name.toLowerCase().includes(term.toLowerCase());
        });
        if ( searchedArray.length > 0){
          return searchedArray;
        }
        return contacts;
  }

}
