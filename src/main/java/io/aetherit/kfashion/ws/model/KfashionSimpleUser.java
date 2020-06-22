package io.aetherit.kfashion.ws.model;

import io.aetherit.kfashion.ws.model.support.KfashionUserType;
import io.aetherit.kfashion.ws.model.support.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionSimpleUser implements Serializable {
    public static final long serialVersionUID = 1L;

    private String id;
    private String password;
    private String name;
    private String email;
    private boolean isAdmin;
    private boolean isApproved;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}
