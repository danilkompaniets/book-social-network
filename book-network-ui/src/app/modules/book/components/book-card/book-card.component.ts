import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from '../../../../services/models/book-response';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-book-card',
  imports: [
    NgIf
  ],
  templateUrl: './book-card.component.html',
  standalone: true,
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  get manage(): boolean {
    return this._manage;
  }

  set manage(value: boolean) {
    this._manage = value;
  }

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64,' + this._book.cover
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  set bookCover(value: String | undefined) {
    this._bookCover = value;
  }

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  private _book: BookResponse = {}
  private _bookCover: String | undefined;
  private _manage: boolean = false

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShowDetails() {
    this.details.emit(this._book)
  }

  onBorrow() {
    this.borrow.emit(this._book)
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book)
  }

  onArchive() {
    this.archive.emit(this._book)
  }

  onEdit() {
    this.edit.emit(this._book)
  }

  onShare() {
    this.share
      .emit(this._book)
  }
}
