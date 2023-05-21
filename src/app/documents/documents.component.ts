import { Component } from '@angular/core';
import { Document } from './document.module';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  selectedDocument: Document;


constructor(private documents: DocumentService) {}

ngOnInit(){
  this.documents.selectedDocument.subscribe(
    (document: Document) => {
    this.selectedDocument = document;
  });
}
}
