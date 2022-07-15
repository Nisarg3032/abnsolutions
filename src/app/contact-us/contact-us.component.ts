import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForms: FormGroup;

  isSubmit = true;
  submitMessage='';

  private myForm: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore){

  }
// https://angular.io/guide/reactive-forms#grouping-form-controls

  ngOnInit(): void {

    this.myForm = this.firestore.collection('enquiry');

    this.contactForms = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", Validators.required),
      message: new FormControl("", Validators.required),
    })
  }


  submitmessage(){
  //console.log(this.contactForms.value);

    this.myForm.add(this.contactForms.value).then((_res: any)=>{
      this.submitMessage = 'Submitted Successfully';
    })
    .catch((err: any)=>{
      console.log(err);
    })

    this.isSubmit = true;
    setTimeout(()=>{
      this.isSubmit=false
    },10000);

  }
}
