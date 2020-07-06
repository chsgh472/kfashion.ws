import {action, computed, flow, observable, toJS} from "mobx";
import React from "react";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    NotAvailableEmail: 'NotAvailableEmail',
    Success: 'Success',
    Fail: 'Fail',
    boundaryList:[],
}

const WorkNo = {
    workNo : '',
}


export default class SignUpStore {
    @observable state = State.Ready;
    @observable workNo = {...WorkNo}

    @action changeWorkNo = (workNo) => {
        this.workNo = workNo;
    }

    @computed get isWorkNo() {
        return this.workNo;
    }

    @action clearState = () => {
        this.state = State.Ready;
    }
    LoadImage = flow(function* loadImage(createdId) {
        try {
          const response = yield axios.get('/api/v1/kfashion/img/boundaryList?createdId='+createdId)
          const boundaryList = response.data.boundaryList;
          this.boundaryList=boundaryList;
          const workNo = this.boundaryList[0].workNo;
          this.workNo = workNo;
        } catch (e) {
            this.loginState = State.Failed;
            this.imageData = Object.assign({}, WorkNo);
        }
    });
}