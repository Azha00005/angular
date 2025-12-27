import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  http: HttpClient = inject(HttpClient)
  cookieService = inject(CookieService)

  token: string | null = null;
  refreshToken: string | null = null;
  router = inject(Router);

  get isAuth(){
    if (!this.token) {
      this.token = this.cookieService.get('token') //если нет токена, то пытаемся взять из куки
      this.refreshToken = this.cookieService.get('refreshToken') //если нет токена, то пытаемся взять из куки
    
    }
    return !!this.token
  }

  login(payload: {username: string; password: string}) {

    const adminLogin = 'admin';
    const adminPassword = '123';

    if (payload.username === adminLogin && payload.password === adminPassword) {
      
      // Создаем имитацию ответа от сервера
      const mockResponse: TokenResponse = {
        access_token: 'fake-jwt-token',
        refresh_token: 'fake-refresh-token'
      };

      // Сохраняем "токены", чтобы Guard и Interceptor думали, что всё честно
      this.saveTokens(mockResponse);

      // Возвращаем успешный поток данных
      return of(mockResponse); 
    }

    // 3. Если данные не совпали — возвращаем ошибку
    return throwError(() => new Error('Неверный логин или пароль'));

    const fd: FormData = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    
    return this.http.post<TokenResponse>(`/api/login`,
      fd,)
      .pipe(
        tap((res : TokenResponse) => { this.saveTokens(res)}),
      );
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `/api/login`,
      {
        refresh_token: this.refreshToken,
      }
    ).pipe(
      tap((res : TokenResponse) => { this.saveTokens(res)}),
      catchError(err => {
        this.loggout();
        throw err;
      })
    );
  }
//очищаем куки
  loggout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
          this.refreshToken = res.refresh_token;

          this.cookieService.set('token', this.token);
          this.cookieService.set('refreshToken', this.refreshToken);
  }
}

