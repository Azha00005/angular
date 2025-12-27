import { Component, inject } from '@angular/core';
import { ProfileServices } from '../../data/services/profile';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [AsyncPipe, ProfileHeader],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  profileServices= inject(ProfileServices);
  route = inject(ActivatedRoute);

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') return this.profileServices.getMe(); // getMe возвращает Observable
        return this.profileServices.getAccount(id); // Обязательно return!
      })

  )
}
