import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.module';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
  document: Document;
  nativeWindow: any;

  constructor(
      private docService: DocumentService
    , private router: Router
    , private route: ActivatedRoute
    , private winRef: WinRefService){
    

  }

  ngOnInit(): void {
    this.nativeWindow = this.winRef.getNativeWindow();

  this.route.params.subscribe((params: Params) => {
    this.document = this.docService.getDocument(params['id']);
  });
}

onView(){
  console.log("deleted a thing 1")
  this.nativeWindow.open(this.document.url)
}


onDelete() {
  this.docService.deleteDocument(this.document);
  this.router.navigate(['../'], { relativeTo: this.route });
}


}
