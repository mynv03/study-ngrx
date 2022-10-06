import { NgModule } from "@angular/core";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { StopTrainingComponent } from "./current-training/stop-training/stop-training.component";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';


@NgModule({
    declarations: [
        TrainingComponent,
        PastTrainingsComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        AngularFirestoreModule,
        TrainingRoutingModule
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}