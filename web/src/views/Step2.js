import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Color from "./step2/Color";
import SleeveLength from "./step2/SleeveLength";
import {inject, observer} from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BasicImageList from "./step2/BasicImageList";
import {fabric} from "fabric";
import {toJS} from "mobx";

const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        maxWidth:'70%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    content:{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonType1:{
        width: '100%',
        height: 50,
    },
    buttonType2:{
        width: '100%',
        height: 50,

    },
    insertButton:{
        width:110,
        marginLeft: 'auto',
    },
});

@inject('basicLabelStore','authStore','imageStore','polygonStore')
@observer
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgData :'',
            workNo:'',
            value: 0,
            number:1,
            createdId: '',
        }
    }
    componentDidMount() {
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.enqueueSnackbar("Step2", {
            variant: 'info',
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.canvas = new fabric.Canvas('c');
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`, this.canvas.renderAll.bind(this.canvas), {
            left: 25,
            top: 25,
            width : 650,
            height : 800,
            originX: 'left',
            originY: 'top'
        });
    }

    handleClickOK = () => {
        this.props.basicLabelStore.changeNewBasicLabelCreatedId(this.state.createdId);
        this.props.basicLabelStore.doBasicLabelUp();
    }

    handleTabChange = (event, newValue) => {
        this.setState({ value: newValue });
    }
    handleTabChangeTop= (event, newNumber) => {
        this.setState({ number: newNumber});
    }
    handleClickItem = (workNo, imageData) => {
        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            left: 25,
            top: 25,
            width : 600,
            height : 800,
            originX: 'left',
            originY: 'top'
        });
    }
    handlePrevious(){
        this.setState({
            count: this.state.count-1
        });
        {this.state.boundaryList.length - this.state.count >=0 ?this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].workNo)
            : alert("첫번째 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }
    handleNext() {
        this.setState({
            count: this.state.count+1
        });
        {this.state.count < this.state.boundaryList.length ?
            this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].workNo)
            :alert("마지막 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }

    onSelectTab(tabIndex) {
        console.log("onSelectTab 들어왔어");
        this.canvas.remove(this.canvas.item(0));
        let polyNo = tabIndex+1;

        const { locationPolygonList } = this.props.polygonStore;
        const selectedPoly=(toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));
        console.log(selectedPoly);

        if(selectedPoly){
            let makePath = 'M ' + selectedPoly[0].locationX + ' ' + selectedPoly[0].locationY;
            for (let i = 1; i < selectedPoly.length; i++) {
                makePath += ' L ' + selectedPoly[i].locationX + ' ' + selectedPoly[i].locationY;
            }
            makePath += ' z';
            let path = new fabric.Path(makePath);
            path.opacity = 0.5;

            console.log(makePath);
            this.canvas.add(path);

        }else{alert("poly정보가 존재하지 않습니다.")}
    };

    render() {
        const { classes,history} = this.props;
        const {isWorkNo} = this.props.imageStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                 <Grid container spacing={3}>
                     <Grid item xs={12} lg={6} style={{margin:"auto"}}>
                         <div style ={{ backgroundColor : "#13264E"}}>
                             <canvas id="c" width={600} height={800} className={classes.canvas}>  </canvas>
                         </div>
                     </Grid>
                     <Grid item xs={12} lg={6}>
                         <Tabs>
                             <TabList onSelect={tabIndex => this.onSelectTab(tabIndex)}>
                                 <Tab style={{width: '50%', height:60,textAlign:'center'}}><h3>영역지정</h3></Tab>
                                 <Tab style={{width: '50%', height:60,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                             </TabList>

                         <TabPanel>
                             <Tabs onSelect={tabIndex => this.onSelectTab(tabIndex)}>
                             <TabList>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 id={1}>상의</h3></Tab>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 id={2}>하의</h3></Tab>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 id={3}>신발</h3></Tab>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 id={4}>가방</h3></Tab>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 id={5}>악세서리</h3></Tab>
                             </TabList>


                             <TabPanel>
                                     <div className={classes.content}>
                                     <Typography variant="h5" component="h2">
                                         색상
                                     </Typography>
                                     <div>
                                         <hr></hr>
                                     </div>
                                     <Color />
                                     </div>
                                     <div className={classes.content}>
                                         <div style={{display:"inline-flex"}}>
                                             <Typography variant="h5" component="h2">
                                                 소매 길이
                                             </Typography>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <SleeveLength />
                                     </div>
                                 </TabPanel>
                                 <TabPanel>
                                     <div className={classes.content}>
                                         <Typography variant="h5" component="h2">
                                             색상
                                         </Typography>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <Color />
                                     </div>
                                     <div className={classes.content}>
                                         <div style={{display:"inline-flex"}}>
                                             <Typography variant="h5" component="h2">
                                                 소매 길이
                                             </Typography>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <SleeveLength />
                                     </div>
                                 </TabPanel>
                                 <TabPanel>
                             <div className={classes.content}>
                                 <Typography variant="h5" component="h2">
                                     색상
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Color />
                             </div>
                             <div className={classes.content}>
                                 <div style={{display:"inline-flex"}}>
                                     <Typography variant="h5" component="h2">
                                         소매 길이
                                     </Typography>
                                 </div>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <SleeveLength />
                             </div>
                         </TabPanel>
                                 <TabPanel>
                             <div className={classes.content}>
                                 <Typography variant="h5" component="h2">
                                     색상
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Color />
                             </div>
                             <div className={classes.content}>
                                 <div style={{display:"inline-flex"}}>
                                     <Typography variant="h5" component="h2">
                                         소매 길이
                                     </Typography>
                                 </div>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <SleeveLength />
                             </div>
                         </TabPanel>
                                 <TabPanel>
                             <div className={classes.content}>
                                 <Typography variant="h5" component="h2">
                                     색상
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Color />
                             </div>
                             <div className={classes.content}>
                                 <div style={{display:"inline-flex"}}>
                                     <Typography variant="h5" component="h2">
                                         소매 길이
                                     </Typography>
                                 </div>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <SleeveLength />
                             </div>
                                 </TabPanel>
                             </Tabs>
                         </TabPanel>
                             <TabPanel>
                            <BasicImageList onClick={this.handleClickItem}/>
                          </TabPanel>
                         </Tabs>

                     </Grid>

                 </Grid>

                </div>

                <hr></hr>
                <Grid container>
                    <Grid item xs={3} lg={1} style={{marginRight:10}}>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handlePrevious.bind(this)}
                >
                    Previous
                </Button>
                    </Grid>
                    <Grid item xs={3} lg={1}>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handleNext.bind(this)}
                >
                    Next
                </Button>
                    </Grid>
                    <Grid item xs={4} lg={2} style={{marginLeft:'auto'}}>
                <Button
                    type="button"
                    className={classes.buttonType2}
                    color="primary"
                    variant="outlined"
                    onClick={()=>history.push('/step3')}
                >
                    Next Step
                </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Step2)));