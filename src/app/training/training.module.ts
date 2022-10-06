import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { StopTrainingComponent } from "./current-training/stop-training/stop-training.component";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";


@NgModule({
    declarations: [
        TrainingComponent,
        PastTrainingsComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        AngularFirestoreModule,
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}