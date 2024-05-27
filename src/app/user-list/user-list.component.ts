import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { task } from '../Task.Model';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  title = 'Country-State-City Dropdown';

  @ViewChild('callAPIDialog') callAPIDialog: any;

  displayedColumns: string[] = ["First Name", "Last Name", "Gender","Contact Number","Email ID","Designation","DOB","Photo","Country","State","City","Pincode","Edit"];
  dataSource: any;

  countries:any = [
    { name: 'USA', states: ['California', 'Texas', 'Florida'] },
    { name: 'India', states: ['Maharashtra', 'Gujarat', 'Rajasthan'] }
  ];
  states:any = [];
  cities:any = {
    'California': ['Los Angeles', 'San Francisco'],
    'Texas': ['Houston', 'Dallas'],
    'Florida': ['Miami', 'Orlando'],
    'Maharashtra': ['Mumbai', 'Pune'],
    'Gujarat': ['Ahmedabad', 'Surat'],
    'Rajasthan': ['Jaipur', 'Udaipur']
  };
  filteredCities = [];

  Tasks:any;
  TODO:any;
  editMode=false
  selectedTask:any;
  TaskIndex:any;
  newArrayData=[]

  public userForm : any
 
  constructor(
    private taskService:TaskService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public route:Router
  ) { }

  ngOnInit(): void {
    this.formInit()
    this.onChanges();

    this.taskService.taskChanged.subscribe(resp=>{
      this.TODO=resp;
      this.dataSource = this.TODO;
    })
    this.TODO=this.taskService.getTodo();
    this.dataSource = this.TODO;
  }

  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formInit(){
    this.userForm = this.fb.group({
      firstName:new FormControl(this.selectedTask ? this.selectedTask.firstName:'',Validators.required),
      lastName: new FormControl(this.selectedTask ? this.selectedTask.lastName:'',Validators.required),
      gender: new FormControl(this.selectedTask ? this.selectedTask.gender:'',Validators.required),
      contact: new FormControl(this.selectedTask ? this.selectedTask.contact:'',Validators.required),
      email: new FormControl(this.selectedTask ? this.selectedTask.email:'',[Validators.required,Validators.email]),
      designation: new FormControl(this.selectedTask ? this.selectedTask.designation:'',Validators.required),
      dob: new FormControl(this.selectedTask ? this.selectedTask.dob:'',Validators.required),
      age:new FormControl(this.selectedTask ? this.selectedTask.age:'',Validators.required),
      photo:new FormControl(this.selectedTask ? this.selectedTask.photo:'',Validators.required),
      country: new FormControl(this.selectedTask ? this.selectedTask.country:'',Validators.required),
      state: new FormControl(this.selectedTask ? this.selectedTask.state:'',Validators.required),
      city: new FormControl(this.selectedTask ? this.selectedTask.city:'',Validators.required),
      pincode: new FormControl(this.selectedTask ? this.selectedTask.pincode:'',[Validators.required,Validators.pattern('^[1-9][0-9]{7}$')]),
    })
  }

  onChanges(): void {
    this.userForm.get('country').valueChanges.subscribe((val:any )=> {
      this.states = this.countries.find((c:any) => c.name === val)?.states || [];
      this.userForm.get('state').setValue('');
      this.userForm.get('city').setValue('');
      this.filteredCities = [];
    });

    this.userForm.get('state').valueChanges.subscribe((val:any) => {
      this.filteredCities = this.cities[val] || [];
      this.userForm.get('city').setValue('');
    });
  }

  onSubmit(){
    if(this.editMode){
       this.taskService.update(
         new task(
          this.userForm.value.firstName,
          this.userForm.value.lastName,
          this.userForm.value.gender,
          this.userForm.value.contact,
          this.userForm.value.email,
          this.userForm.value.designation,
          this.userForm.value.dob,
          this.userForm.value.age,
          this.userForm.value.photo,
          this.userForm.value.country,
          this.userForm.value.state,
          this.userForm.value.city,
          this.userForm.value.pincode
          ),this.TaskIndex);
       this.editMode=false;
       this.userForm.reset();
    }
    else{
      this.taskService.add(
        new task(
          this.userForm.value.firstName,
          this.userForm.value.lastName,
          this.userForm.value.gender,
          this.userForm.value.contact,
          this.userForm.value.email,
          this.userForm.value.designation,
          this.userForm.value.dob,
          this.userForm.value.age,
          this.userForm.value.photo,
          this.userForm.value.country,
          this.userForm.value.state,
          this.userForm.value.city,
          this.userForm.value.pincode
          ));
      this.userForm.reset();
      this.dialog.closeAll()
    }
  }


  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.dateFormat(event.value)
    let dob: any = event.value;
    if (dob) {
      var timeDiff = Math.abs(Date.now() - dob);
      this.userForm.controls['age'].setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
    }
  }

  dateFormat(dateString:any){
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); 
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const year = date.getFullYear();
    this.userForm.value.dob = `${day}-${month}-${year}`
  }


updateDialog(index:any) {
  this.editMode = true;
  this.selectedTask=this.taskService.getTask(index);
  this.TaskIndex=index;
  this.formInit();

  let dialogRef = this.dialog.open(this.callAPIDialog);
  dialogRef.afterClosed().subscribe(result => {
     console.log("close dialog")
  })
}

addDialog() {
  this.editMode = false;
  let dialogRef = this.dialog.open(this.callAPIDialog);
  dialogRef.afterClosed().subscribe(result => {
     console.log("close dialog")
  })
}
  
showGraph(){
  this.route.navigate(['/dashboard'], { queryParams:{obj: JSON.stringify(this.TODO )}})
}

cancel(){
  this.userForm.reset();
  this.dialog.closeAll()
}



}
