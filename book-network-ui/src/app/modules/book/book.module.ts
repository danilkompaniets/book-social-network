import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookRoutingModule} from './book-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTokenInterceptor} from '../../services/interceptors/http-token.interceptor';
import {BookListComponent} from './pages/book-list/book-list.component';
import {MainComponent} from './pages/main/main.component';
import {BookCardComponent} from './components/book-card/book-card.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookRoutingModule,
    BookListComponent,
    MainComponent,
    BookCardComponent
  ],
})
export class BookModule {
}
