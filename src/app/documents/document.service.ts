import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.module';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documents: Document[] = [];
  
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
