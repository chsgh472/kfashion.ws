package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import java.util.List;

public interface KfashionCategoryItemMapper {
    List<KfashionCategoryItem> selectColorList();

    List<KfashionCategoryItem> selectSleeveLengthList();

    List<KfashionCategoryItem> selectStyleList();

    List<KfashionCategoryItem> selectCategoryList();

    List<KfashionCategoryItem> selectDetailList();

    List<KfashionCategoryItem> selectPrintList();

    List<KfashionCategoryItem> selectTextureList();

    List<KfashionCategoryItem> selectLengthList();

    List<KfashionCategoryItem> selectNeckLineList();

    List<KfashionCategoryItem> selectColorKaraList();

    List<KfashionCategoryItem> selectFitList();

    List<KfashionCategoryItem> selectSafeList();

    List<KfashionCategoryItem> selectSilhouetteList();
}