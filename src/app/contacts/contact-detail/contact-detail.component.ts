import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Contact } from '../contact.model';
import { Contacts } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {

  @Input() contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Contacts
  ) {}

  // ngOnInit() {
  //   this.contact$ = this.route.paramMap.pipe(
  //     switchMap((params: ParamMap) =>
  //       this.service.getContact(params.get('id')!))
  //   );
  // }
}
