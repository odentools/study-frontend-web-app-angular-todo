import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tasks = ['ライブの申し込み', 'セトリの予想', 'サイリウムの注文', '宿の手配'];

  addTaskName = '';

  onSubmitAddTaskForm() {
    if (this.addTaskName == '') return;
    this.tasks.push(this.addTaskName);
    this.addTaskName = '';
  }
}
