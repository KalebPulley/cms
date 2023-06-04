import { Component } from '@angular/core';
import { Document } from '../document.module';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
  document: Document;

  constructor(
      private docService: DocumentService
    , private router: Router
    , private route: ActivatedRoute){
    

  }

  ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    this.document = this.docService.getDocument(params['id']);
  });
}


}
