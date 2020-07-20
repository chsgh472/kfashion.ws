import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import {inject, observer} from "mobx-react";

const style = theme => ({
    root: {
        border: '1px solid black',
        borderRadius: 1,
        margin:0,
        padding:0,
    },
    topBox:{
        borderBottom:'1px solid black',
    },
    imgBox:{
        width:60,
        height:80,
        borderRadius: 10,
    }
});

@inject('professionalLabelStore','authStore','workStore')
@observer
class WorkedImg extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            boundaryList: [],
        }
    }
    componentDidMount() {
        const id = this.props.authStore.loginUser.id;
        this.props.professionalLabelStore.LoadRecentImage(id)
    }

    handleClick=(item)=>{
        this.props.professionalLabelStore.LoadLabelList(item.workNo);
        const labelNo1 =this.props.professionalLabelStore.styleReviewLabel.labelNo1;
        if(labelNo1 === 1) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo1(labelNo1);
        }
        const labelNo2 =this.props.professionalLabelStore.styleReviewLabel.labelNo2;
        if(labelNo2 === 2) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo1(labelNo2);
        }
        const labelNo3 =this.props.professionalLabelStore.styleReviewLabel.labelNo3;
        if(labelNo3 === 3) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo1(labelNo3);
        }
        const labelNo4 =this.props.professionalLabelStore.styleReviewLabel.labelNo4;
        if(labelNo4 === 4) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo1(labelNo4);
        }
        const labelNo5 =this.props.professionalLabelStore.styleReviewLabel.labelNo5;
        if(labelNo5 === 5) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo1(labelNo5);
        }

    }
    render() {
        const {recentlyImg} = this.props.professionalLabelStore;
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                        <h3>이전작업 </h3>
                    {recentlyImg.map((item) =>
                        <Button className={classes.imgBox} onClick={() => this.handleClick(item)}>
                            <img src={item.fileName} style={{width: 80, height: 80}}/>
                        </Button>
                    )
                    }
            </div>
        );
    }
}
export default withStyles(style) (WorkedImg);