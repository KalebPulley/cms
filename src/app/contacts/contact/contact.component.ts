import { Component, Input } from '@angular/core';
import { Contact } from '../contact.modle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(){
    
  }
  @Input() contact: Contact;
  
  
  

}
