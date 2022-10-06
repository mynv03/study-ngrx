import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.sevice';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  onGoingTraining = false;
  exerciseSubcription: Subscription;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.exerciseSubcription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if(exercise){
        this.onGoingTraining = true;
      }else{
        this.onGoingTraining = false;
      }
    })
  }

  ngOnDestroy(): void {
    if(this.exerciseSubcription){
      this.exerciseSubcription.unsubscribe();
    }
  }
}
