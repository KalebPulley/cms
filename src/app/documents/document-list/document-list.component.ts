import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.module'
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter();

  documents: Document[];
  subscription: Subscription;
    
  constructor(private DocumentSer: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.DocumentSer.getDocuments();
    this.subscription = this.DocumentSer.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
