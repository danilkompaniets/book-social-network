import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from '../../components/book-card/book-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {PageResponseBookResponse} from '../../../../services/models/page-response-book-response';
import {BookService} from '../../../../services/services/book.service';
import {BookResponse} from '../../../../services/models/book-response';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-my-books',
  imports: [
    BookCardComponent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './my-books.component.html',
  standalone: true,
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {}
  message: string = "";
  level: string = "success"
  page = 0
  size = 5

  get isLastPage(): boolean {
    return this.page === this.bookResponse.totalPages as number - 1;
  }

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.findAllBooks()
  }

  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
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
      next: () => {
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

  shareBook(book: BookResponse) {

  }

  editBook(book: BookResponse) {

  }

  archiveBook(book: BookResponse) {

  }
}
