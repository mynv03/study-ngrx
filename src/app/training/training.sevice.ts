import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from './exercise.module';
import { UIService } from '../shared/ui.service';

@Injectable({
    providedIn: 'root'
})
export class TrainingService{
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishExercises: Exercise[] = [];
    finishExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];
    private fbSubs: Subscription[] = [];
    constructor(
        private firestore: AngularFirestore,
        private uiService: UIService) {

    }
    fetchAvailableExercises(){
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs.push(this.firestore
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              const data = doc.payload.doc.data() as Exercise;
              return {
                id: doc.payload.doc.id,
                ...data as Exercise
              }
            })
          })
        ).subscribe((exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        }, err => {
            this.uiService.loadingStateChanged.next(false);
            console.log(err)
        }))
    }

    startExercise(selectedId: string){
        // this.firestore.doc('availableExercises/' + selectedId).update({
        //     lastSelected: new Date()
        // })
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise(){
        this.addDateToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number){
        this.addDateToDatabase({
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100), 
            calories: this.runningExercise.calories * (progress / 100), 
            date: new Date(), 
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(){
        return {...this.runningExercise};
    }

    fetchCompletedOrCancelledExercises(){
        // return this.exercises.slice();
        this.fbSubs.push(this.firestore.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[])=>{
            this.finishExercisesChanged.next(exercises)
        }, err => {
            console.log(err)
        }));
    }

    cancelSubcriptions(){
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDateToDatabase(exercise: Exercise){
        this.firestore.collection('finishedExercises').add(exercise);
    }
}

