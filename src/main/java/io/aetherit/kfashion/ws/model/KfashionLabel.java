package io.aetherit.kfashion.ws.model;

import java.time.LocalDateTime;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionLabel {

    private Long workNo;
    private int workStep;
    private int labelNo;
    private int no;
    private int categoryNo;
    private int categoryItemNo;
    private String categoryName;
    private String categoryItemName;
    private String createdId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}
