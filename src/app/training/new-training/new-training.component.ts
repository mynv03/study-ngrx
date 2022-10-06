import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.sevice';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // exercises: Exercise[] = [];
  exercises: Exercise[];
  exerciseSubcription: Subscription;
  isLoading = false;
  private subs: Subscription[] = [];
  constructor(
    private trainingService: TrainingService,
    private firestore: AngularFirestore,
    private uiService: UIService

  ) { }

  ngOnInit(): void {
    // this.exercises = this.trainingService.getAvailableExercises();
    this.subs.push(this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }))
    this.subs.push(this.trainingService.exercisesChanged.subscribe(res => {
      this.exercises = res;
    }));
    this.trainingService.fetchAvailableExercises();
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
    this.exerciseSubcription.unsubscribe();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
