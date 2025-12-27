import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import {map} from 'rxjs/operators';
import { pipe } from 'rxjs';
import id from '@angular/common/locales/extra/id';


@Injectable({
  providedIn: 'root',
})
export class ProfileServices {
  http: HttpClient = inject(HttpClient);

  baseAPIUrl: string = 'https://jsonplaceholder.typicode.com';

  getTestAccount() {
    return this.http.get<Profile[]>(`${this.baseAPIUrl}/users`);
  }
  
  // Имитируем "Мой профиль", запрашивая первого пользователя
  getMe() {
    return this.http.get<Profile>(`${this.baseAPIUrl}/users/1`);
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseAPIUrl}/users/${id}`);
  
  }

  // Имитируем список подписчиков (берем первых 3 пользователей)
  getSubscribersSHortList() {
    return this.http.get<Profile[]>(`${this.baseAPIUrl}/users`)
      .pipe(
        map(res => res.slice(0, 3)) // Берем только 3 человека
      );
  }


}
