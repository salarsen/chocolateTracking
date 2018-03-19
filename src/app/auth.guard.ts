import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable, Inject } from '@angular/core';

import { authService } from './services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
    
    constructor(
        private auth: authService,
        private router : Router,
    ){}

    canActivate(
        router : ActivatedRouteSnapshot,
        status : RouterStateSnapshot
    ) : boolean {
        const isAuthed = this.auth.isAuthed();

        if(!isAuthed){
            this.router.navigate(['/'])
        }

        return isAuthed;
    }
}