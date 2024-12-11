import {Component} from '@angular/core';
import {MenuComponent} from '../../components/menu/menu.component';
import {RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpTokenInterceptor} from '../../../../services/interceptors/http-token.interceptor';

@Component({
  selector: 'app-main',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './main.component.html',
  standalone: true,
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
