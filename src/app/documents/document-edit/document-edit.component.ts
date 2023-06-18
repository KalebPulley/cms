import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(
      null,
      value.name,
      value.description,
      value.url
    );
    if (this.editMode) {
      this.docService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.docService.addDocument(newDocument);
    }
    this.onCancel();
  }

constructor(
  private docService: DocumentService,
  private router: Router,
  private route: ActivatedRoute
) {}

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;




  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.docService.getDocument(id);
      if (
        this.originalDocument === undefined ||
        this.originalDocument === null
      ) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  };
 
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}


