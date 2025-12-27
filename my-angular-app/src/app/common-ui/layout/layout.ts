import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar} from '../sidebar/sidebar'
import { ProfileServices } from '../../data/services/profile';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  profileServices = inject(ProfileServices)

  //используется для инициализации данных профиля при загрузке лэйаута
  ngOnInit() {
    this.profileServices.getMe().subscribe( val => {
      console.log(val); //проверка что запрос отработал и получается ответ      
    });
  }
}
