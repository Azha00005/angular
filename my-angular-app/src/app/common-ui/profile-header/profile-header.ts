import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-profile-header',
  imports: [],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {
  profile = input<Profile>();
}
