import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.sevice';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  @Output() trainingExit = new EventEmitter();
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if(this.progress === 100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step)
  }

  stopTraining(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.trainingService.cancelExercise(this.progress);
      }else{
        this.startOrResumeTimer();
      }
    })
  }
}
