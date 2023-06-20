import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Contact } from '../contact.modle';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {


  contact: Contact;

  constructor(
    private contactSer: ContactService
  , private router: Router
  , private route: ActivatedRoute){
}

ngOnInit(): void {
this.route.params.subscribe((params: Params) => {
  this.contact = this.contactSer.getContact(params['id']);
});
}

  onDelete() {
    this.contactSer.deleteContact(this.contact);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
