import { EventEmitter, Injectable } from '@angular/core';
import  { Contact } from './contact.modle';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  //database url
  private contURL = 'https://wdd430backend-default-rtdb.firebaseio.com/contacts.json';

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
  storeContacts() {
    this.http
    .put(this.contURL, JSON.stringify(this.contacts), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .subscribe(() =>{
      this.contacts.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) { 
    this.contacts = MOCKCONTACTS;
  }

  selectedContactEvent = new EventEmitter<Contact>();

  getContacts(): Contact[] {
    //return this.contacts.slice();
    this.http
    .get<Contact[]>(this.contURL)
    .subscribe((cont: Contact[]) => {
      this.contacts = cont;
      this.maxContactId = this.getMaxId();
      this.contacts.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  });
  return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((c) => {
      if (+c.id > maxId) maxId = +c.id;
    });
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) return;
    this.maxContactId++;
    newContact.id = `${this.maxContactId}`;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(original: Contact, newContact: Contact) {
    if (
      newContact === null ||
      newContact === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;

    newContact.id = original.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }
}
