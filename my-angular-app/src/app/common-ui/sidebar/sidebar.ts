import { Component, inject } from '@angular/core';
import { SubscriberCard} from '../sidebar/subscriber-card/subscriber-card';
import { ProfileServices } from '../../data/services/profile';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [SubscriberCard, AsyncPipe, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  profileServices = inject(ProfileServices);

  subscribers$ =this.profileServices.getSubscribersSHortList();

  menuItems=[
    {
      label:'Моя страница',
      link:'/profile/me'
    },
    {
      label:'Чат',
      link:'/chats'
    },{
      label:'Поиск',
      link:'/'
    },
  ]
}
