import { HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "./auth";
import { catchError, switchMap, throwError } from "rxjs";
import { TokenResponse } from "./auth.interface";


let isRefresh: boolean = false;

//req - то, что перехватывает next - чтобы отпустить
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    //добавляем токен в хедеры каждого запроса
    const authService = inject(Auth);
    const token = authService.token;

    if (!token) return next(req);

    if (isRefresh) {
        return refreshAndProcceed(authService, req, next);
    }
    
    return next(addToken(req, token))
    .pipe(
        catchError(error => {
            if (error.status === 403) {
                //логика обновления токена
                return refreshAndProcceed(authService, req, next);
            }

            return throwError(() => error);
        })
    );
    
}


const refreshAndProcceed = (
    //протипизовали данные
    authService: Auth,
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    if (!isRefresh) {
        isRefresh = true;
        return authService.refreshAuthToken()
        .pipe(
            switchMap((res: TokenResponse) => {
                isRefresh=false;
                return next(addToken(req, res.access_token))
            })
        )
    }
    return next(addToken(req, authService.token!));
}

const addToken = (req: HttpRequest<any>, token: string) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}
