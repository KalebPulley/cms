import { EventEmitter, Injectable } from '@angular/core';
import  { Contact } from './contact.modle';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  //database url
  private contURL = 'http://localhost:3000/api/contacts';

  deleteContact(cont: Contact) {
    this.http.delete(this.contURL + "/" + cont.id)
    .subscribe(() => {
      const updatedcontacts = this.contacts.filter(contact => contact.id !== cont.id);
      this.contacts = updatedcontacts;
      this.contactListChangedEvent.next([...this.contacts]);
    });
    this.getContacts();


    // if (!contact) return;
    // const pos = this.contacts.indexOf(contact);
    // if (pos < 0) return;
    // this.contacts.splice(pos, 1);
    // this.storeContacts();
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
    .get<{document: string, contacts: any[]}>(this.contURL)
    .pipe(map((contactData) => {
      return contactData.contacts.map((contact: { name: any; email: any; phone: any; imageUrl: any; _id: any; group: any;}) => {
        return {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        imageUrl: contact.imageUrl,
        group: contact.phone
        }
      });
    }))
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
    const contact: any = { name: newContact.name, email: newContact.email, phone: newContact.phone, imageUrl: newContact.imageUrl, group: newContact.group };
    this.http
    .post<{ contact: string, contactId: string }>("http://localhost:3000/api/contacts", contact)
    .subscribe(responseData =>{
      const id = responseData.contactId;
      contact.id = id;
      this.contacts.push(contact);
      this.contactListChangedEvent.next([...this.contacts]);
      this.getContacts();
    });
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
    this.addContact(newContact);
    this.deleteContact(original);
  }
}
