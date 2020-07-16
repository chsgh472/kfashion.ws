import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import {inject, observer} from "mobx-react";

const style = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        border: '1px solid black',
        borderRadius: 15,
        padding:10
    },
    topBox:{
        borderBottom:'1px solid black',
        textAlign:'center',
        width:80,
        display:'block',
        margin:'auto',
        padding:0
    },
    imgBox:{
        width:80,
        height:80,
        display:'block',
        margin:'auto',
        padding:3,
    }
});

@inject('imageStore','authStore')
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
        this.props.imageStore.LoadRecentImage(id)
    }

    handleClick=()=>{

    }
    render() {
        const {recentlyImg} = this.props.imageStore;
        const {classes} = this.props;
        console.log('recentlyImg',recentlyImg)
        return (
            <div className={classes.root}>
                <Grid item xs={12}>
                    <div className={classes.topBox}>
                        <h3>이전작업 </h3>
                    </div>
                    {recentlyImg.map((item) =>
                            <Button className={classes.imgBox} onClick={() => this.handleClick}>
                                <img src={item.fileName} style={{width: '100%', height: '100%'}}/>
                            </Button>
                    )
                    }
                </Grid>
            </div>
        );
    }
}
export default withStyles(style) (WorkedImg);