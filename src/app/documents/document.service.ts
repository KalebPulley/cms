import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  selectedDocumentEvent: any;
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  //http code
  private docsURL = 'https://wdd430backend-default-rtdb.firebaseio.com/documents.json';


  
  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }


  private documents: Document[] = [];
  private maxDocumentId: number;
  
  constructor(private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS
    this.maxDocumentId = this.getMaxId();
  }


  selectedDocument = new EventEmitter<Document>();
  
  getDocuments(): Document[] {
    //return this.documents.slice();
    this.http
    .get<Document[]>(this.docsURL)
    .subscribe((docs: Document[]) => {
      this.documents = docs;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  });
  return this.documents.slice();
  }

  storeDocuments() {
    this.http
    .put(this.docsURL, JSON.stringify(this.documents), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .subscribe(() =>{
      this.documents.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  getDocument(id: string): Document {
    return this.documents.find((c) => c.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    return maxId;
  }

  addDocument(newDoc: Document) {
    if (newDoc === null || newDoc === undefined) return;
    this.maxDocumentId++;
    newDoc.id = `${this.maxDocumentId}`;
    this.documents.push(newDoc);
    this.storeDocuments();
  }

  updateDocument(original: Document, newDoc: Document) {
    if (
      newDoc === null ||
      newDoc === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDoc.id = original.id;
    this.documents[pos] = newDoc;
    this.storeDocuments();
  }
}
