package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationPolygonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionImageLocationPolygonRepository {
    private KfashionImageLocationPolygonMapper mapper;

    @Autowired
    public KfashionImageLocationPolygonRepository(KfashionImageLocationPolygonMapper mapper) {
        this.mapper = mapper;
    }

    public String insertLocationPolygon(KfashionImageLocationPolygon polygon) {
        String msg="";
        mapper.insertLocationPolygon(polygon);
        return msg;
    }
    public List<KfashionImageLocationPolygon> selectPolygonList(String createdId) {
        return mapper.selectPolygonList(createdId);
    }
}
