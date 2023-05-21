import { EventEmitter, Injectable } from '@angular/core';
import  { Contact } from './contact.modle';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class Contacts {
  selectedContact = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

}
