import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  task = '';
  tasksList: { id: number; name: string; date: Date }[] = [];

  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/tasks';

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get(this.apiUrl).subscribe((res: any) => {
      console.log(res);
      this.tasksList = res;
    });
  }

  addTasks() {
    // this.tasksList.push({id: this.tasksList.length+1, name: this.task, date: new Date()});

    if (!this.task || this.task.trim() === '') {
      return;
    }

    const newTask = {
      id: this.tasksList.length + 1,
      name: this.task,
      date: new Date(),
    };

    this.http.post(this.apiUrl, newTask).subscribe((res: any) => {
      this.getTasks();
      this.task = '';
    });
  }
}
