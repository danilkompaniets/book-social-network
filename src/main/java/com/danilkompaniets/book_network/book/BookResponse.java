package com.danilkompaniets.book_network.book;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {

    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private boolean archived;
    private boolean sharable;

    private String owner;
    private byte[] cover;
    private double rate;
}
