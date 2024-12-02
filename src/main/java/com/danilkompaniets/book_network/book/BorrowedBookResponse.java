package com.danilkompaniets.book_network.book;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedBookResponse {
    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private boolean returned;
    private boolean returnApproved;
    private double rate;
}
