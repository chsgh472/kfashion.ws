package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.repository.mapper.KfashionCategoryItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class KfashionCategoryItemRepository {

    private KfashionCategoryItemMapper mapper;

    @Autowired
    public KfashionCategoryItemRepository(KfashionCategoryItemMapper mapper) {
        this.mapper = mapper;
    }


    public List<KfashionCategoryItem> selectColorList() {
        return mapper.selectColorList();
    }

    public List<KfashionCategoryItem> selectSleeveLengthList() {
        return mapper.selectSleeveLengthList();
    }

    public List<KfashionCategoryItem> selectStyleList() {
        return mapper.selectStyleList();
    }

    public List<KfashionCategoryItem> selectCategoryList0() {
        return mapper.selectCategoryList0();
    }
    public List<KfashionCategoryItem> selectCategoryList1() {
        return mapper.selectCategoryList1();
    }
    public List<KfashionCategoryItem> selectCategoryList2() {
        return mapper.selectCategoryList2();
    }
    public List<KfashionCategoryItem> selectCategoryList3() {
        return mapper.selectCategoryList3();
    }

    public List<KfashionCategoryItem> selectDetailList() {
        return mapper.selectDetailList();
    }

    public List<KfashionCategoryItem> selectPrintList() {
        return mapper.selectPrintList();
    }

    public List<KfashionCategoryItem> selectTextureList() {
        return mapper.selectTextureList();
    }

    public List<KfashionCategoryItem> selectLengthList() {
        return mapper.selectLengthList();
    }

    public List<KfashionCategoryItem> selectNeckLineList() {
        return mapper.selectNeckLineList();
    }

    public List<KfashionCategoryItem> selectKaraList() {
        return mapper.selectKaraList();
    }

    public List<KfashionCategoryItem> selectFitList() {
        return mapper.selectFitList();
    }

    public List<KfashionCategoryItem> selectSafeList() {
        return mapper.selectSafeList();
    }

    public List<KfashionCategoryItem> selectSilhouetteList() {
        return mapper.selectSilhouetteList();
    }
}
