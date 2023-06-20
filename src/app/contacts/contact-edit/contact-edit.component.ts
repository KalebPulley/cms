import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.modle';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent {
  group: any;
  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(
      null,
                value.name,
                value.email,
                value.phone,
                value.imageUrl,
                value.group,
    );
    if (this.editMode) {
      this.contService.updateContact(this.originalContact, newContact);
    } else {
      this.contService.addContact(newContact);
    }
    this.onCancel();
  }

  
  constructor(
    private contService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contService.getContact(id);
      if (
        this.originalContact === undefined ||
        this.originalContact === null
      ) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
    });
  };

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    if (this.isInvalidContact(selectedContact)) return;
    this.group.push(selectedContact);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;
    return this.group.some((c) => newContact.id === c.id);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.group.length) return;
    this.group.splice(index, 1);
  }
}

