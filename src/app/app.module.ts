import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


//import {DndModule} from 'ng2-dnd';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactComponent,
    DocumentsComponent,
    MessagesComponent,  
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DocumentEditComponent,
    ContactDetailComponent,
    ContactEditComponent,
    ContactsFilterPipe  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    //DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
