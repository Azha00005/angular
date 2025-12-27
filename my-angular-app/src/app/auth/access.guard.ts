import { inject } from "@angular/core"
import { Auth } from "./auth"
import { Router } from "@angular/router";

export const canActivateAuth = () => {
    const isLoggin: boolean = inject(Auth).isAuth;
    if(isLoggin) {
        return true
    }

    return inject(Router).createUrlTree(['/login'])
}