import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewProfessionalLabel = {
    workNo : '',
    workStep : 6,
    labelNo1 : 0,
    labelNo2 : 0,
    labelNo3 : 0,
    labelNo4 : 0,
    labelNo5 : 0,
    createId : '',
    style : '',
    styleSub : '',
    styleCategoryNo : '',
    styleCategorySubNo : '',
    category1 : '',
    category2 : '',
    category3 : '',
    category4 : '',
    categoryCategoryNo1 : '',
    categoryCategoryNo2 : '',
    categoryCategoryNo3 : '',
    categoryCategoryNo4 : '',
    detail1 : '',
    detail2 : '',
    detail3 : '',
    detail4 : '',
    detailCategoryNo1 : '',
    detailCategoryNo2 : '',
    detailCategoryNo3 : '',
    detailCategoryNo4 : '',
    print1 : '',
    print2 : '',
    print3 : '',
    print4 : '',
    printCategoryNo1 : '',
    printCategoryNo2 : '',
    printCategoryNo3 : '',
    printCategoryNo4 : '',
    texture1 : '',
    texture2 : '',
    texture3 : '',
    texture4 : '',
    textureCategoryNo1 : '',
    textureCategoryNo2 : '',
    textureCategoryNo3 : '',
    textureCategoryNo4 : '',
    clothLength1 : '',
    clothLength2 : '',
    clothLength3 : '',
    clothLength4 : '',
    clothLengthCategoryNo1 : '',
    clothLengthCategoryNo2 : '',
    clothLengthCategoryNo3 : '',
    clothLengthCategoryNo4 : '',
    neckLine1 : '',
    neckLine2 : '',
    neckLine4 : '',
    neckLineCategoryNo1 : '',
    neckLineCategoryNo2 : '',
    neckLineCategoryNo4 : '',
    kara1 : '',
    kara2 : '',
    kara4 : '',
    karaCategoryNo1 : '',
    karaCategoryNo2 : '',
    karaCategoryNo4 : '',
    fit1 : '',
    fit2 : '',
    fit3 : '',
    fit4 : '',
    fitCategoryNo1 : '',
    fitCategoryNo2 : '',
    fitCategoryNo3 : '',
    fitCategoryNo4 : '',

    styleItemName :'',
    styleSubItemName : '',
    categoryItemName1 : '',
    categoryItemName2 : '',
    categoryItemName3 : '',
    categoryItemName4 : '',
    detailItemName1 : '',
    detailItemName2 : '',
    detailItemName3 : '',
    detailItemName4 : '',
    printItemName1 : '',
    printItemName2 : '',
    printItemName3 : '',
    printItemName4 : '',
    textureItemName1 : '' ,
    textureItemName2 : '' ,
    textureItemName3 : '' ,
    textureItemName4 : '' ,
    clothLengthItemName1 : '',
    clothLengthItemName2 : '',
    clothLengthItemName3 : '',
    clothLengthItemName4 : '',
    neckLineItemName1 : '',
    neckLineItemName2 : '',
    neckLineItemName4 : '',
    karaItemName1: '',
    karaItemName2 : '',
    karaItemName4 : '',
    fitItemName1 : '',
    fitItemName2 : '',
    fitItemName3 : '',
    fitItemName4 : '',
}
export default class ProfessionalLabelStore {
    @observable state = State.Ready;
    @observable newProfessionalLabel = {...EmptyNewProfessionalLabel}
    @observable professionalList = [];
    @observable recentlyImg=[];
    @observable outerReviewLabel= {...EmptyNewProfessionalLabel}
    @observable topReviewLabel= {...EmptyNewProfessionalLabel}
    @observable pantsReviewLabel= {...EmptyNewProfessionalLabel}
    @observable onePieceReviewLabel= {...EmptyNewProfessionalLabel}
    @observable styleReviewLabel= {...EmptyNewProfessionalLabel}

    @action initStore = () => {
        this.professionalList = [];
    }

    @action changeNewProfessionalLabelNo1 = (labelNo1) => {
        this.newProfessionalLabel.labelNo1 = labelNo1;
    }

    @action changeNewProfessionalLabelNo2 = (labelNo2) => {
        this.newProfessionalLabel.labelNo2 = labelNo2;
    }
    @action changeNewProfessionalLabelNo3 = (labelNo3) => {
        this.newProfessionalLabel.labelNo3 = labelNo3;
    }
    @action changeNewProfessionalLabelNo4 = (labelNo4) => {
        this.newProfessionalLabel.labelNo4 = labelNo4;
    }
    @action changeNewProfessionalLabelNo5 = (labelNo5) => {
        this.newProfessionalLabel.labelNo5 = labelNo5;
    }

    @action changeNewProfessionalLabelStyle = (style) => {
        this.newProfessionalLabel.style = style.no;
        this.newProfessionalLabel.styleCategoryNo = style.categoryNo;
        this.newProfessionalLabel.styleItemName = style.categoryItemName;
        return this.newProfessionalLabel;
    }
    @action deleteStyle = () => {
        this.newProfessionalLabel.style = '';
        this.newProfessionalLabel.styleCategoryNo = 0;
        this.newProfessionalLabel.styleItemName = '';
        return this.newProfessionalLabel;
    }
    @action deleteSubStyle = () => {
        this.newProfessionalLabel.styleSub = '';
        this.newProfessionalLabel.styleCategorySubNo = 0;
        this.newProfessionalLabel.styleSubItemName = '';
        return this.newProfessionalLabel;
    }
    @action changeNewProfessionalLabelStyleSub = (styleSub) => {
        this.newProfessionalLabel.styleSub = styleSub.no;
        this.newProfessionalLabel.styleCategorySubNo = styleSub.categoryNo;
        this.newProfessionalLabel.styleSubItemName = styleSub.categoryItemName;
        return this.newProfessionalLabel;
    }
    @action changeNewProfessionalLabelCategory1 = (category1) => {
        this.outerReviewLabel.category1 = category1.no;
        this.outerReviewLabel.categoryCategoryNo1 = category1.categoryNo;
        this.outerReviewLabel.categoryItemName1 = category1.categoryItemName;
        return this.outerReviewLabel
    }
    @action deleteCategory1 = () => {
        this.outerReviewLabel.category1 = '';
        this.outerReviewLabel.categoryCategoryNo1 = 0;
        this.outerReviewLabel.categoryItemName1 = '';
        return this.outerReviewLabel;
    }
    @action changeNewProfessionalLabelCategory2 = (category2) => {
        this.topReviewLabel.category2 = category2.no;
        this.topReviewLabel.categoryCategoryNo2 = category2.categoryNo;
        this.topReviewLabel.categoryItemName2 = category2.categoryItemName;
        return this.topReviewLabel;
    }
    @action deleteCategory2 = () => {
        this.topReviewLabel.category2 = '';
        this.topReviewLabel.categoryCategoryNo2 = 0;
        this.topReviewLabel.categoryItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteCategory3 = () => {
        this.pantsReviewLabel.category3 = '';
        this.pantsReviewLabel.categoryCategoryNo3 = 0;
        this.pantsReviewLabel.categoryItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deleteCategory4 = () => {
        this.onePieceReviewLabel.category4 = '';
        this.onePieceReviewLabel.categoryCategoryNo4 = 0;
        this.onePieceReviewLabel.categoryItemName4 = '';
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelCategory3 = (category3) => {
        this.pantsReviewLabel.category3 = category3.no;
        this.pantsReviewLabel.categoryCategoryNo3 = category3.categoryNo;
        this.pantsReviewLabel.categoryItemName3 = category3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action changeNewProfessionalLabelCategory4 = (category4) => {
        this.onePieceReviewLabel.category4 = category4.no;
        this.onePieceReviewLabel.categoryCategoryNo4 = category4.categoryNo;
        this.onePieceReviewLabel.categoryItemName4 = category4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelDetail1 = (detail1) => {
        this.outerReviewLabel.detail1 = detail1.no;
        this.outerReviewLabel.detailCategoryNo1 = detail1.categoryNo;
        this.outerReviewLabel.detailItemName1 = detail1.categoryItemName;
        return this.outerReviewLabel
    }
    @action deleteDetail1 = () => {
        this.outerReviewLabel.detail1 = '';
        this.outerReviewLabel.detailCategoryNo1 = 0;
        this.outerReviewLabel.detailItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteDetail2 = () => {
        this.topReviewLabel.detail2 = '';
        this.topReviewLabel.detailCategoryNo2 = 0;
        this.topReviewLabel.detailItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteDetail3 = () => {
        this.pantsReviewLabel.detail3 = '';
        this.pantsReviewLabel.detailCategoryNo3 = 0;
        this.pantsReviewLabel.detailItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deleteDetail4 = () => {
        this.onePieceReviewLabel.detail4 = '';
        this.onePieceReviewLabel.detailCategoryNo4 = 0;
        this.onePieceReviewLabel.detailItemName4 = '';
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelDetail2 = (detail2) => {
        this.topReviewLabel.detail2 = detail2.no;
        this.topReviewLabel.detailCategoryNo2 = detail2.categoryNo;
        this.topReviewLabel.detailItemName2 = detail2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelDetail3= (detail3) => {
        this.pantsReviewLabel.detail3 = detail3.no;
        this.pantsReviewLabel.detailCategoryNo3 = detail3.categoryNo;
        this.pantsReviewLabel.detailItemName = detail3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action changeNewProfessionalLabelDetail4 = (detail4) => {
        this.onePieceReviewLabel.detail4 = detail4.no;
        this.onePieceReviewLabel.detailCategoryNo4 = detail4.categoryNo;
        this.onePieceReviewLabel.detailItemName4 = detail4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelPrint4= (print4) => {
        this.onePieceReviewLabel.print4 = print4.no;
        this.onePieceReviewLabel.printCategoryNo4 = print4.categoryNo;
        this.onePieceReviewLabel.printItemName4 = print4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action deletePrint1 = () => {
        this.outerReviewLabel.print1 = '';
        this.outerReviewLabel.printCategoryNo1 = 0;
        this.outerReviewLabel.printItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deletePrint2 = () => {
        this.topReviewLabel.print2 = '';
        this.topReviewLabel.printCategoryNo2 = 0;
        this.topReviewLabel.printItemName2 = '';
        return this.topReviewLabel;
    }
    @action deletePrint3 = () => {
        this.pantsReviewLabel.print3 = '';
        this.pantsReviewLabel.printCategoryNo3 = 0;
        this.pantsReviewLabel.printItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deletePrint4 = () => {
        this.onePieceReviewLabel.print4 = '';
        this.onePieceReviewLabel.printCategoryNo4 = 0;
        this.onePieceReviewLabel.printItemName4 = '';
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelPrint1= (print1) => {
        this.outerReviewLabel.print1 = print1.no;
        this.outerReviewLabel.printCategoryNo1 = print1.categoryNo;
        this.outerReviewLabel.printItemName1 = print1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelPrint2= (print2) => {
        this.topReviewLabel.print2 = print2.no;
        this.topReviewLabel.printCategoryNo2 = print2.categoryNo;
        this.topReviewLabel.printItemName2 = print2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelPrint3= (print3) => {
        this.pantsReviewLabel.print3 = print3.no;
        this.pantsReviewLabel.printCategoryNo3 = print3.categoryNo;
        this.pantsReviewLabel.printItemName3 = print3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action changeNewProfessionalLabelTexture4 = (texture4) => {
        this.onePieceReviewLabel.texture4 = texture4.no;
        this.onePieceReviewLabel.textureCategoryNo4 = texture4.categoryNo;
        this.onePieceReviewLabel.textureItemName4 = texture4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelTexture1 = (texture1) => {
        this.outerReviewLabel.texture1 = texture1.no;
        this.outerReviewLabel.textureCategoryNo1 = texture1.categoryNo;
        this.outerReviewLabel.textureItemName1 = texture1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelTexture2 = (texture2) => {
        this.topReviewLabel.texture2 = texture2.no;
        this.topReviewLabel.textureCategoryNo2 = texture2.categoryNo;
        this.topReviewLabel.textureItemName2 = texture2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelTexture3 = (texture3) => {
        this.pantsReviewLabel.texture3 = texture3.no;
        this.pantsReviewLabel.textureCategoryNo3 = texture3.categoryNo;
        this.pantsReviewLabel.textureItemName3 = texture3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action deleteTexture1 = () => {
        this.outerReviewLabel.texture1 = '';
        this.outerReviewLabel.textureCategoryNo1 = 0;
        this.outerReviewLabel.textureItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteTexture2 = () => {
        this.topReviewLabel.texture2 = '';
        this.topReviewLabel.textureCategoryNo2 = 0;
        this.topReviewLabel.textureItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteTexture3 = () => {
        this.pantsReviewLabel.texture3 = '';
        this.pantsReviewLabel.textureCategoryNo3 = 0;
        this.pantsReviewLabel.textureItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deleteTexture4 = () => {
        this.onePieceReviewLabel.texture4 = '';
        this.onePieceReviewLabel.textureCategoryNo4 = 0;
        this.onePieceReviewLabel.textureItemName4 = '';
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelClothLength4 = (clothLength4) => {
        this.onePieceReviewLabel.clothLength4 = clothLength4.no;
        this.onePieceReviewLabel.clothLengthCategoryNo4 = clothLength4.categoryNo;
        this.onePieceReviewLabel.clothLengthItemName4 = clothLength4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelClothLength1 = (clothLength1) => {
        this.outerReviewLabel.clothLength1 = clothLength1.no;
        this.outerReviewLabel.clothLengthCategoryNo1 = clothLength1.categoryNo;
        this.outerReviewLabel.clothLengthItemName1 = clothLength1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelClothLength2 = (clothLength2) => {
        this.topReviewLabel.clothLength2 = clothLength2.no;
        this.topReviewLabel.clothLengthCategoryNo2 = clothLength2.categoryNo;
        this.topReviewLabel.clothLengthItemName2 = clothLength2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelClothLength3 = (clothLength3) => {
        this.pantsReviewLabel.clothLength3 = clothLength3.no;
        this.pantsReviewLabel.clothLengthCategoryNo3 = clothLength3.categoryNo;
        this.pantsReviewLabel.clothLengthItemName3 = clothLength3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action deleteClothLength1 = () => {
        this.outerReviewLabel.clothLength1 = '';
        this.outerReviewLabel.clothLengthCategoryNo1 = 0;
        this.outerReviewLabel.clothLengthItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteClothLength2 = () => {
        this.topReviewLabel.clothLength2 = '';
        this.topReviewLabel.clothLengthCategoryNo2 = 0;
        this.topReviewLabel.clothLengthItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteClothLength3 = () => {
        this.pantsReviewLabel.clothLength3 = '';
        this.pantsReviewLabel.clothLengthCategoryNo3 = 0;
        this.pantsReviewLabel.clothLengthItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deleteClothLength4 = () => {
        this.onePieceReviewLabel.clothLength4 = '';
        this.onePieceReviewLabel.clothLengthCategoryNo4 = 0;
        this.onePieceReviewLabel.clothLengthItemName4 = '';
        return this.onePieceReviewLabel;
    }

    @action changeNewProfessionalLabelNeckLine4 = (neckLine4) => {
        this.onePieceReviewLabel.neckLine4 = neckLine4.no;
        this.onePieceReviewLabel.neckLineCategoryNo4 = neckLine4.categoryNo;
        this.onePieceReviewLabel.neckLineItemName4 = neckLine4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelNeckLine1 = (neckLine1) => {
        this.outerReviewLabel.neckLine1 = neckLine1.no;
        this.outerReviewLabel.neckLineCategoryNo1 = neckLine1.categoryNo;
        this.outerReviewLabel.neckLineItemName1 = neckLine1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelNeckLine2 = (neckLine2) => {
        this.topReviewLabel.neckLine2 = neckLine2.no;
        this.topReviewLabel.neckLineCategoryNo2 = neckLine2.categoryNo;
        this.topReviewLabel.neckLineItemName2 = neckLine2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelKara4 = (kara4) => {
        this.onePieceReviewLabel.kara4 = kara4.no;
        this.onePieceReviewLabel.karaCategoryNo4= kara4.categoryNo;
        this.onePieceReviewLabel.karaItemName4 = kara4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action deleteNeckLine1 = () => {
        this.outerReviewLabel.neckLine1 = '';
        this.outerReviewLabel.neckLineCategoryNo1 = 0;
        this.outerReviewLabel.neckLineItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteNeckLine2 = () => {
        this.topReviewLabel.neckLine2 = '';
        this.topReviewLabel.neckLineCategoryNo2 = 0;
        this.topReviewLabel.neckLineItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteNeckLine4 = () => {
        this.onePieceReviewLabel.neckLine4 = '';
        this.onePieceReviewLabel.neckLineCategoryNo4 = 0;
        this.onePieceReviewLabel.neckLineItemName4 = '';
        return this.onePieceReviewLabel;
    }
    @action deleteKara1 = () => {
        this.outerReviewLabel.kara1 = '';
        this.outerReviewLabel.karaCategoryNo1 = 0;
        this.outerReviewLabel.karaItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteKara2 = () => {
        this.topReviewLabel.kara2 = '';
        this.topReviewLabel.karaCategoryNo2 = 0;
        this.topReviewLabel.karaItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteKara4 = () => {
        this.onePieceReviewLabel.kara4 = '';
        this.onePieceReviewLabel.karaCategoryNo4 = 0;
        this.onePieceReviewLabel.karaItemName4 = '';
        return this.onePieceReviewLabel;
    }

    @action deleteClothLength4 = () => {
        this.onePieceReviewLabel.clothLength4 = '';
        this.onePieceReviewLabel.clothLengthCategoryNo4 = 0;
        this.onePieceReviewLabel.clothLengthItemName4 = '';
        return this.onePieceReviewLabel;
    }
    @action deleteClothLength4 = () => {
        this.onePieceReviewLabel.clothLength4 = '';
        this.onePieceReviewLabel.clothLengthCategoryNo4 = 0;
        this.onePieceReviewLabel.clothLengthItemName4 = '';
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelKara1 = (kara1) => {
        this.outerReviewLabel.kara1 = kara1.no;
        this.outerReviewLabel.karaCategoryNo1 = kara1.categoryNo;
        this.outerReviewLabel.karaItemName1 = kara1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelKara2 = (kara2) => {
        this.topReviewLabel.kara2 = kara2.no;
        this.topReviewLabel.karaCategoryNo2 = kara2.categoryNo;
        this.topReviewLabel.karaItemName2 = kara2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelFit4 = (fit4) => {
        this.onePieceReviewLabel.fit4 = fit4.no;
        this.onePieceReviewLabel.fitCategoryNo4 = fit4.categoryNo;
        this.onePieceReviewLabel.fitItemName4 = fit4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action changeNewProfessionalLabelFit1 = (fit1) => {
        this.outerReviewLabel.fit1 = fit1.no;
        this.outerReviewLabel.fitCategoryNo1 = fit1.categoryNo;
        this.outerReviewLabel.fitItemName1 = fit1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelFit2 = (fit2) => {
        this.topReviewLabel.fit2 = fit2.no;
        this.topReviewLabel.fitCategoryNo2 = fit2.categoryNo;
        this.topReviewLabel.fitItemName2 = fit2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelFit3 = (fit3) => {
        this.pantsReviewLabel.fit3 = fit3.no;
        this.pantsReviewLabel.fitCategoryNo3 = fit3.categoryNo;
        this.pantsReviewLabel.fitItemName3 = fit3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action deleteFit1= () => {
        this.outerReviewLabel.fit1 = '';
        this.outerReviewLabel.fitCategoryNo1 = 0;
        this.outerReviewLabel.fitItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteFit2= () => {
        this.topReviewLabel.fit2 = '';
        this.topReviewLabel.fitCategoryNo2 = 0;
        this.topReviewLabel.fitItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteFit3= () => {
        this.pantsReviewLabel.fit3 = '';
        this.pantsReviewLabel.fitCategoryNo3 = 0;
        this.pantsReviewLabel.fitItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deleteFit4= () => {
        this.onePieceReviewLabel.fit4 = '';
        this.onePieceReviewLabel.fitCategoryNo4 = 0;
        this.onePieceReviewLabel.fitItemName4 = '';
        return this.onePieceReviewLabel;
    }

    @action changeNewProfessionalLabelCreatedId = (createdId) => {
        this.newProfessionalLabel.createdId = createdId;
    }

    @action changeNewProfessionalLabelWorkNo = (workNo) => {
        this.newProfessionalLabel.workNo = workNo;
    }

    @computed get isPending() {
        return this.state === State.Pending;
    }

    @computed get isLabelUpSuccess() {
        return this.state === State.Success;
    }

    @computed get isLabelUpFailed() {
        return this.state === State.Fail;
    }

    LoadProfessionalList = flow(function* loadProfessionalList(createdId) {
        this.professionalList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/img/professionalList?createdId='+createdId)
            this.professionalList = response.data.professionalList;
            console.log(' this.professionalList', this.professionalList)
        } catch (e) {
            console.log('error')
        }
    });

    LoadRecentImage = flow(function* LoadRecentImage(createdId) {
        this.recentlyImg = [];
        try {
            const response = yield axios.get(`/api/v1/kfashion/img/recentlyImg?createdId=`+createdId)
            this.recentlyImg = response.data.recentlyImg;
        } catch (e) {
            console.log('error')
        }
    });

    doProfessionalLabelUp = flow(function* doProfessionalLabelUp() {
        this.state = State.Pending;
        try {
                const param = toJS(this.newProfessionalLabel);

                const resp = yield axios.post('/api/v1/kfashion/label/professionalLabel', param);
                if (resp.status === 200) {
                    const createdId =this.newProfessionalLabel.createdId;
                    this.state = State.Success;
                    this.LoadProfessionalList(createdId);
                    this.LoadRecentImage(createdId);
                } else {
                    this.state = State.Fail;
                }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });

    LoadLabelList = flow(function* LoadLabelList(workNo) {
        this.state = State.Pending;
        try {
            const response = yield axios.get('/api/v1/kfashion/label/reviewLabelList?workNo='+workNo)
            console.log(response.data)
            if(response.data.outerReviewLabel != null) {
                this.outerReviewLabel = response.data.outerReviewLabel;
            }else {
                this.outerReviewLabel= [];
            }
            if(response.data.topReviewLabel != null) {
                this.topReviewLabel = response.data.topReviewLabel;
            }else {
                this.topReviewLabel = [];
            }
            if(response.data.pantsReviewLabel != null) {
                this.pantsReviewLabel = response.data.pantsReviewLabel;
            }else {
                this.pantsReviewLabel = [];
            }
            if(response.data.onePieceReviewLabel != null) {
                this.onePieceReviewLabel = response.data.onePieceReviewLabel;
            }else {
                this.onePieceReviewLabel = [];
            }if(response.data.styleReviewLabel != null) {
                this.styleReviewLabel = response.data.styleReviewLabel;
            }else {
                this.styleReviewLabel = [];
            }

        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });
}