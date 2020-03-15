import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
    private firestore: AngularFirestore,
    private toaster: ToastrService
    ) { }

  ngOnInit() {
    this.resetFrom()
  }

  resetFrom(form?: NgForm){
    if(form != null)
      form.resetForm();
    this.service.formData={
      id: null,
      fullName: '',
      empCode: '',
      position: '',
      mobile: ''
    }
  }

  onSubmit(form: NgForm){
    let data = form.value;
    this.firestore.collection('employees').add(data);
    this.resetFrom(form);
    this.toaster.success('Submitted SuccessFully', 'EMP. Register');
  }

}
