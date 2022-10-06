import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class UIService{
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar){

    }

    showSnackbar(message, action, duration){
        this.snackbar.open(message, action, {
            duration: duration
        })
    }
}