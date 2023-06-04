import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  selectedDocumentEvent: any;
  deleteDocument(document: Document) {
    throw new Error('Method not implemented.');
  }

  private documents: Document[] = [];
  documentChangedEvent: any;
  
  constructor() { 
    this.documents = MOCKDOCUMENTS
  }


  selectedDocument = new EventEmitter<Document>();
  
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((c) => c.id === id);
  }
}
