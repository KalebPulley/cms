import { Component, Input } from '@angular/core';
import { Document } from '../document.module'

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {

  constructor(){
    
  }

  @Input() document: Document;
}
