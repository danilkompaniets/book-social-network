import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {BookService} from '../../../../services/services/book.service';
import {PageResponseBookResponse} from '../../../../services/models/page-response-book-response';
import {NgForOf, NgIf} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpTokenInterceptor} from '../../../../services/interceptors/http-token.interceptor';
import {BookCardComponent} from '../../components/book-card/book-card.component';
import {BookResponse} from '../../../../services/models/book-response';

@Component({
  selector: 'app-book-list',
  imports: [
    NgForOf,
    BookCardComponent,
    NgIf
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    }
  ],
  templateUrl: './book-list.component.html',
  standalone: true,
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {}
  message: string = "";
  level: string = "success"
  page = 0
  size = 5

  get isLastPage(): boolean {
    return this.page === this.bookResponse.totalPages as number - 1;
  }

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks()
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page, size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
      }
    })
  }

  borrowBook(book: BookResponse) {
    this.message = ""
    this.bookService.borrowBook({
      "book-id": book.id as number,
    }).subscribe({
      next: (book) => {
        this.level = "success"
        this.message = "book successfully added to your waiting list"
      },
      error: (error) => {
        console.log(error);
        this.message = error.error.error;
      }
    })
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks()
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks()
  }

  goToPage(newPage: number) {
    this.page = newPage;
    this.findAllBooks()
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks()
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks()
  }
}
