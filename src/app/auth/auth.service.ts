import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject'

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { TrainingService } from '../training/training.sevice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private snackbar: MatSnackBar,
        private uIService: UIService
    ){

    }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(["/training"]);
            }else{
                this.trainingService.cancelSubcriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(["/login"]);
            }
        })
    }
    registerUser(authData: AuthData) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random()* 10000).toString()
        // }
        this.uIService.loadingStateChanged.next(true);
        this.afAuth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            // this.router.navigate(["/login"]);
            this.uIService.loadingStateChanged.next(false);
        })
        .catch(err => {
            this.uIService.loadingStateChanged.next(false);
            this.snackbar.open(err.message, null, {
                duration: 3000
            })
        })
    }

    login(authData: AuthData){
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random()* 10000).toString()
        // }
        this.uIService.loadingStateChanged.next(true);
        this.afAuth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.uIService.loadingStateChanged.next(false);
            })
            .catch(err => {
                this.uIService.loadingStateChanged.next(false);
                this.snackbar.open(err.message, null, {
                    duration: 3000
                })
            })
    }

    logout(){
        this.afAuth.signOut();
    }

    isAuth(){
        return this.isAuthenticated;
    }
}