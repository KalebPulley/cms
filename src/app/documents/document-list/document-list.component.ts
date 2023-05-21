import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.module'
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter();

  documents: Document[];
  // documents = [
  //   new Document('1', 'Test 1', 'This is test 1.', 'https://www.example.com/1'),
  //   new Document('2', 'Test 2', 'This is test 2.', 'https://www.example.com/2'),
  //   new Document('3', 'Test 3', 'This is test 3.', 'https://www.example.com/3'),
  //   new Document('4', 'Test 4', 'This is test 4.', 'https://www.example.com/4'),
  //   new Document('5', 'Test 5', 'This is test 5.', 'https://www.example.com/5'),
  // ];

 
  
  constructor(private Documents: DocumentService) {}

  onSelected(Document: Document) {
    this.Documents.selectedDocument.emit(Document);
  }
  
  
  
  
  ngOnInit(){
    this.documents =  this.Documents.getDocuments();
  }
}
