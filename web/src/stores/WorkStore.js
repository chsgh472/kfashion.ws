import {action, computed, flow, observable, toJS} from "mobx";
import React from "react";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    NotAvailableEmail: 'NotAvailableEmail',
    Success: 'Success',
    Fail: 'Fail',
}

const AddState = {
    Closed: 'Closed',
    Opened: 'Opened',
    Adding: 'Adding',
    Added: 'Added',
    AddFailed: 'AddFailed',
};

const UpdateState = {
    Closed: 'Closed',
    Loading: 'Loading',
    Loaded: 'Loaded',
    LoadFailed: 'LoadFailed',
    Updating: 'Updating',
    Updated: 'Updated',
    UpdateFailed: 'UpdateFailed',
    Uploading: 'Uploading',
    Uploaded: 'Uploaded',
    UploadFailed: 'UploadFailed',
};

const ReviewLabel = {
    styleItemName :'',
    styleSubItemName : '',
    categoryItemName : '',
    detailItemName : '',
    printItemName : '',
    textureItemName : '' ,
    clothLengthItemName : '',
    neckLineItemName : '',
    karaItemName : '',
    fitItemName : '',

    style : '',
    styleSub : '',
    styleCategoryNo : '',
    styleCategorySubNo : '',
    category : '',
    category1 : '',
    category2 : '',
    category3 : '',
    categoryCategoryNo : '',
    detail : '',
    detail1 : '',
    detail2 : '',
    detail3 : '',
    detailCategoryNo : '',
    print : '',
    print1 : '',
    print2 : '',
    print3 : '',
    printCategoryNo : '',
    texture : '',
    texture1 : '',
    texture2 : '',
    texture3 : '',
    textureCategoryNo : '',
    clothLength : '',
    clothLength1 : '',
    clothLength2 : '',
    clothLength3 : '',
    clothLengthCategoryNo : '',
    neckLine : '',
    neckLine1 : '',
    neckLine2 : '',
    neckLine3 : '',
    neckLineCategoryNo : '',
    kara : '',
    kara1 : '',
    kara2 : '',
    kara3 : '',
    karaCategoryNo : '',
    fit : '',
    fit1 : '',
    fit2 : '',
    fit3 : '',
    fitCategoryNo : '',
}



export default class WorkStore {
    @observable workQuantity= 0;
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
    @observable authorityNo = 0;
    @observable styleReviewLabel = {...ReviewLabel};
    @observable outerReviewLabel = {...ReviewLabel};
    @observable topReviewLabel = {...ReviewLabel};
    @observable pantsReviewLabel = {...ReviewLabel};
    @observable onePieceReviewLabel = {...ReviewLabel};
    @observable WorkProgressRate = [];

    @action initStore = () => {
        this.professionalList = 0;
    }

    @action reSetCategoryItem=()=>{
        this.outerReviewLabel = [];
        this.topReviewLabel = [];
        this.pantsReviewLabel = [];
        this.onePieceReviewLabel = [];
    }

    @action changeAuthorityNo = (authorityNo) => {
        this.authorityNo = authorityNo;
    }


    LoadWorkQuantity = flow(function* loadWorkQuantity(authorityNo) {
        this.workQuantity = 0;
        try {
            const response = yield axios.get('/api/v1/kfashion/work/workQuantity?authorityNo='+authorityNo)
            this.workQuantity = response.data.workQuantity;
        } catch (e) {
            console.log('error')
        }
    });

    LoadReviewLabelList = flow(function* loadReviewLabelList(workNo) {
        try {
            console.log("LoadReviewLabelList")
            const response = yield axios.get(`/api/v1/kfashion/label/reviewLabelList?workNo=${workNo}`)
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
            console.log("styleReviewLabel" + this.styleReviewLabel);
            console.log("outerReviewLabel" + this.outerReviewLabel);
            console.log("topReviewLabel" + this.topReviewLabel);
            console.log("pantsReviewLabel" + this.pantsReviewLabel);
            console.log("onePieceReviewLabel" + this.onePieceReviewLabel);

        } catch (e) {
            console.log('error')
        }
    });


    // LoadProgressList = flow(function* loadProgressList(rowDataId) {
    //     this.state = State.Pending;
    //     let authorityNo = this.authorityNo;
    //     try {
    //         const response = yield axios.get('/api/v1/kfashion/work/history/progressRate?createdId=' + rowDataId + '&authorityNo=' + authorityNo)
    //             this.WorkProgressRate = response.data.selectWorkProgressRate;
    //             this.total = this.WorkProgressRate.totalWork;
    //             this.complete = this.WorkProgressRate.finishWork;
    //             this.percent = (this.complete/this.total)*100;
    //
    //             console.log(this.total)
    //             console.log(this.complete)
    //             console.log(this.percent)
    //
    //     }catch (e) {
    //         console.log("error LoadProgressList", e);
    //     }
    // })
}