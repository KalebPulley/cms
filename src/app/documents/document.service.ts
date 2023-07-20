import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  selectedDocumentEvent: any;
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  //http code
  private docsURL = 'http://localhost:3000/api/documents';


  
  deleteDocument(doc: Document) {
    this.http.delete(this.docsURL +"/"+doc.id)
    .subscribe(() => {
      const updateddocuments = this.documents.filter(document => document.id !== doc.id);
      this.documents = updateddocuments;
      this.documentListChangedEvent.next([...this.documents]);
    });
    this.getDocuments();

    // if (!document) return;
    // const pos = this.documents.indexOf(document);
    // if (pos < 0) return;
    // this.documents.splice(pos, 1);
    // this.storeDocuments();
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
    .get<{document: string, documents: any[]}>(this.docsURL)
    .pipe(map((documentData) => {
      return documentData.documents.map((document: { name: any; description: any; children: any; url: any; _id: any;}) => {
        return {
        id: document._id,
        name: document.name,
        description: document.description,
        url: document.url,
        children: document.children
        }
      });
    }))
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
    console.log(JSON.stringify(this.documents));
    
    return this.documents.find((c) => c.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    return maxId;
  }

  addDocument(document: Document) {
    if (document === null || document === undefined) return;
    const documentsend: any = { name: document.name, description: document.description, children: document.children, url: document.url };
    this.http
    .post<{ document: string, documentId: string }>("http://localhost:3000/api/documents", document)
    .subscribe(responseData =>{
      const id = responseData.documentId;
      document.id = id;
      this.documents.push(document);
      this.documentListChangedEvent.next([...this.documents]);
      this.getDocuments();
    });
  }

  updateDocument(original: Document, newDoc: Document) {
    //const message: any = { id: originalmessage.id, title: newmessage.title, content: newmessage.content };
    this.addDocument(newDoc);
    this.deleteDocument(original);
    this.getDocuments();
  }
}
