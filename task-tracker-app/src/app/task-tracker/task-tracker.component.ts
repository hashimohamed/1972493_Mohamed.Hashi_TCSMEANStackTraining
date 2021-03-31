import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskTrackerService } from '../task-tracker.service';
import { Users } from './user';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {
  ELEMENT_DATA: Users[] = [];
  displayedColumns: string[] = ["Id", "Name", "task", "Dateline"];
  dataSource = new MatTableDataSource < Users > (this.ELEMENT_DATA);
  constructor(public ttSer: TaskTrackerService) {}
  ngOnInit(): void {
    this.getAllReports();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 40000); // Activate after 30 seconds.

  }

  storeTaskData(taskRef: any) {
    this.ttSer.storeTask(taskRef);
    console.log(taskRef)

  }
  getAllReports() {
    let resp = this.ttSer.getUsers();
    resp.subscribe(report => this.dataSource.data = report as Users[])
  }

}
