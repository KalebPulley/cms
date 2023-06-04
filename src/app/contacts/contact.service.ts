import { EventEmitter, Injectable } from '@angular/core';
import  { Contact } from './contact.modle';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class Contacts {
  contactChangedEvent = new EventEmitter<Contact[]>();

  
  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  private contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  selectedContactEvent = new EventEmitter<Contact>();

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

}
