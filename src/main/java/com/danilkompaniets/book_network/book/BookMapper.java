package com.danilkompaniets.book_network.book;

import com.danilkompaniets.book_network.file.FileUtils;
import com.danilkompaniets.book_network.history.BookTransactionHistory;

import org.springframework.stereotype.Service;

@Service
public class BookMapper {
    public Book toBook(BookRequest request) {
        return Book.builder()
                .id(request.id())
                .title(request.title())
                .authorName(request.authorName())
                .synopsis(request.synopsis())
                .archived(false)
                .sharable(request.sharable())
                .build();
    }

    public BookResponse toBookResponse(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authorName(book.getAuthorName())
                .owner(book.getOwner().fullName())
                .synopsis(book.getSynopsis())
                .archived(book.isArchived())
                .sharable(book.isSharable())
                .isbn(book.getIsbn())
                .rate(book.getRate())
                .cover(FileUtils.readFileFromLocation(book.getBookCover()))
                .build();
    }

    public BorrowedBookResponse toBorrowedBookResponse(BookTransactionHistory history) {
        return BorrowedBookResponse.builder()
                .id(history.getBook().getId())
                .title(history.getBook().getTitle())
                .authorName(history.getBook().getAuthorName())
                .isbn(history.getBook().getIsbn())
                .rate(history.getBook().getRate())

                .returned(history.isReturned())
                .returnApproved(history.isReturnApproved())
                .build();
    }
}
