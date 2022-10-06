import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.sevice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private exChangedSubcription: Subscription;
  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.exChangedSubcription = this.trainingService.finishExercisesChanged.subscribe((exercises: Exercise[])=>{
      this.dataSource.data = exercises;
      
    })
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    if(this.exChangedSubcription){
      this.exChangedSubcription.unsubscribe();
    }
  }
  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
