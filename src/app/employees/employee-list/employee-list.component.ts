import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[]

  constructor(private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      })
    })
  }

  onEdit(emp: Employee){
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string){
    if(confirm('Are you sure, you want to delete this record?')){
      this.firestore.doc('employees/'+id).delete();
      this.toastr.error('Deleted Successfully', 'Emp. Register')
    }
  }

}
