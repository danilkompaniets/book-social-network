import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {BookListComponent} from './pages/book-list/book-list.component';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpTokenInterceptor} from '../../services/interceptors/http-token.interceptor';
import {MyBooksComponent} from './pages/my-books/my-books.component';
import {ManageBookComponent} from './pages/manage-book/manage-book.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: BookListComponent
      },
      {
        path: "my-books",
        component: MyBooksComponent
      },
      {
        path: "manage/:bookId",
        component: ManageBookComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
