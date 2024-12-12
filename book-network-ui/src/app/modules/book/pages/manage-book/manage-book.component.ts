import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {BookRequest} from '../../../../services/models/book-request';
import {FormsModule} from '@angular/forms';
import {BookResponse} from '../../../../services/models/book-response';
import {Router, RouterLink} from '@angular/router';
import {BookService} from '../../../../services/services/book.service';

@Component({
  selector: 'app-manage-book',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-book.component.html',
  standalone: true,
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent {
  errorMsg: Array<string> = []
  selectedBookCover: any;
  selectedPicture: string | undefined;
  bookRequest = {
    sharable: false,
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };

  constructor(private bookService: BookService, private router: Router) {
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId: number) => {
        this.bookService.uploadBookCoverPicture({
          "book-id": bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(["/books/my-books"])
          }
        })
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    })
  }
}
