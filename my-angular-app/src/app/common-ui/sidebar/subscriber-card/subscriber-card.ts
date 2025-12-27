import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';

@Component({
  selector: 'app-subscriber-card',
  imports: [],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss',
})
export class SubscriberCard {
  @Input() profile!: Profile;

}
