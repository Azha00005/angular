import { Component, inject, signal } from '@angular/core';
import { ProfileServices } from '../../data/services/profile';
import { observeOn } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileServices = inject(ProfileServices);
  profiles = signal<Profile[]>([]);

  constructor() {
    this.profileServices.getTestAccount()
    .subscribe((val: Profile[]) => {
      // 3. Обновите значение сигнала через .set()
      this.profiles.set(val);
  });
}
}
