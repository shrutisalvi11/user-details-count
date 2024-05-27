import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { task } from './Task.Model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  UserDetails: task[] = [
    new task(
      "alex",
      "akdkhkd",
      "male",
      "9082544564",
      "alex@gmail.com",
      "developer",
      "11-10-1995",
      "28",
      "profile.jpg",
      "india",
      "maharashtra",
      "mumbai",
      "400016"
    ),
    new task(
      "shruti",
      "salvi",
      "female",
      "9082544564",
      "shruti@gmail.com",
      "hshs",
      "1995-10-10T18:30:00.000Z",
      "22",
      "C:\\fakepath\\Screenshot from 2024-03-19 16-02-11.png",
      "India",
      "Maharashtra",
      "Mumbai",
      "400016"
    ),
    new task(
      "XYZ",
      "KKA",
      "male",
      "9082544564",
      "xyz@gmail.com",
      "hshs",
      "1999-11-16T18:30:00.000Z",
      "32",
      "C:\\fakepath\\Screenshot from 2024-03-19 16-02-11.png",
      "India",
      "Maharashtra",
      "Mumbai",
      "400016"
    ),
    new task(
      "jksjd",
      "kkeje",
      "female",
      "9087651234",
      "shruti@gmail.com",
      "dhjfh",
      "1998-10-15T18:30:00.000Z",
      "50",
      "C:\\fakepath\\Screenshot from 2024-05-23 13-35-23.png",
      "USA",
      "Texas",
      "Dallas",
      "122341")
  ];

  taskChanged = new Subject<task[]>();
  constructor() { }

  getTodo() {
    return this.UserDetails.slice();
  }

  add(taskname: task) {
    this.UserDetails.push(taskname);
    this.taskChanged.next(this.UserDetails.slice())
  }

  getTask(index: any) {
    return this.UserDetails[index];
  }

  update(task: task, index: any) {
    this.UserDetails[index] = task;
    this.taskChanged.next(this.UserDetails.slice())
  }

  updateArray(task: task[]) {
    this.UserDetails = [];
    this.UserDetails = task;
  }
}
