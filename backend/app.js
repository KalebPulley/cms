const express = require('express');
const Document = require('./models/document');
const Message = require('./models/message');
const Contact = require('./models/contact');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();



mongoose.connect(`mongodb+srv://pul21001:${process.env.MONGODB_API_KEY}@cluster0.qcchu6m.mongodb.net/node-angular?retryWrites=true&w=majority`)
    .then(() => {console.log('Connected to database');}).catch(() =>{
        console.log('conection failed');
    });

/**
 * get notes from mongoDb
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/messages", (req, res, next) => {
    const message = new Message({
      title: req.body.title,
      content: req.body.content
    });
    message.save().then(createdmessage => {
      res.status(201).json({
        message: "message added successfully",
        messageId: createdmessage._id
      });
    });
  });

app.get("/api/messages", (req, res, next) => {
    Message.find().then(documents =>{
        res.status(200).json({
            message: "messages fetched successfully",
            messages: documents
        });
        //console.log(JSON.stringify(documents));
    });
});

app.post("/api/messages/update", (req, res, next) => {
    const message = new Message({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
      });
      message.updateOne({_id: req.body.id}, [{title: req.body.title},
        {content: req.body.content}], {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');        
    })
    .then(createdmessage => {
        res.status(201).json({
          message: "message added successfully",
          messageId: createdmessage._id
        });});
});

app.delete('/api/messages/:id', (req, res, next) =>{
    message.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'message deleted'});
    });
});

//________________________//

app.post("/api/documents", (req, res, next) => {
    const document = new Document({
     name: req.body.name,
     description: req.body.description,
     url: req.body.url,
     children: req.body.children
    });
    console.log(JSON.stringify(document));
    document.save().then(createdocument => {
        res.status(201).json({
        message: "document added successfully",
        noteId: createdocument._id
        })
    });
});


app.get("/api/documents", (req, res, next) => {
    Document.find().then(documents =>{
        res.status(200).json({
            message: "documentes fetched successfully",
            documents: documents
        });
        //console.log(JSON.stringify(documents));
    });
});

app.delete('/api/documents/:id', (req, res, next) =>{
    Document.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result);
            if (result.n === 0) {
                res.sendStatus(404);
            } else {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json({ message: 'Successfully deleted monitor!' });
            }
        })
        .catch(function (err) {
          console.log(err);
        });
    
    });

app.post("/api/documents/update", (req, res, next) => {
    const document = new Document({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        children: req.body.children
      });
      document.updateOne({_id: req.body.id}, [{title: req.body.title},
        {question: req.body.question}, {answer: req.body.answer}], {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');        
    })
    .then(createddocument => {
        res.status(201).json({
          message: "document added successfully",
          documentId: createddocument._id
        });});
});

//---------------------------------//

app.post("/api/contacts", (req, res, next) => {
    const contact = new Contact({
      name: req.body.name
    , email: req.body.email
    , phone: req.body.phone
    , imageUrl: req.body.imageUrl
    , group: req.body.group
    });
    console.log(JSON.stringify(contact));
    contact.save().then(createcontact => {
        res.status(201).json({
        message: "contact added successfully",
        noteId: createcontact._id
        })
    });
});


app.get("/api/contacts", (req, res, next) => {
    Contact.find().then(documents =>{
        res.status(200).json({
            message: "contactes fetched successfully",
            contacts: documents
        });
        //console.log(JSON.stringify(contacts));
    });
});

app.delete('/api/contacts/:id', (req, res, next) =>{
    Contact.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'contact deleted'});
    });
});

app.post("/api/contacts/update", (req, res, next) => {
    const contact = new Contact({
        name: req.body.name
      , email: req.body.email
      , phone: req.body.phone
      , imageUrl: req.body.imageUrl
      , group: req.body.group
      });
      contact.updateOne({_id: req.body.id}, [{title: req.body.title},
        {question: req.body.question}, {answer: req.body.answer}], {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');        
    })
    .then(createdcontact => {
        res.status(201).json({
          message: "contact added successfully",
          contactId: createdcontact._id
        });});
});


module.exports = app;