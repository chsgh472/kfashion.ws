import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import CategoryComponent1 from "./step3/CategoryComponent1";
import CategoryComponent2 from "./step3/CategoryComponent2";
import CategoryComponent3 from "./step3/CategoryComponent3";
import CategoryComponent4 from "./step3/CategoryComponent4";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {fabric} from "fabric";
import Style from "../views/step3/Style";
import ProImageList from "../views/step3/ProImageList";
import {toJS} from "mobx";
import ErrorIcon from "@material-ui/icons/Error";
import WorkedImg from "./step2/WorkedImg";


const styles = theme => ({   root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 500,
    },
    mainContainer: {
        flexGrow: 1,
        marginTop:10,
        maxWidth:'100%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
        padding:0,
    },
    buttonType1:{
        width: 100,
        marginRight: theme.spacing(2),
    },
    buttonType2:{
        width: 150,
        float:'right',

    },
    toolButton:{
        border:'1px solid black',
        height:50,
        width:'100%',
    },
    toolBox:{
        border:'1px solid black',
        marginRight: 1,
        height:'100%',
    },
    fileText: {
        paddingRight: theme.spacing(2),
        textAlign: 'left'
    },
    fileSelection: {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0,
        borderRadius: 12,
    },
    divStyle: {
        display: 'inline',
    },canvas:{
        width: '100%',
        height: '100%',
    }
});

@inject('professionalLabelStore','authStore', 'imageStore', 'currentStepStore','polygonStore','workStore')
@observer
class Step3 extends React.Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            selectedNo:0,
            selectedName:'',
            selectedSubNo:0,
            selectedSubName:'',
            tabIndex: 1,
            tabIndex1:0,
            createdId: '',
        }
    }

    componentDidMount() {
        this.props.currentStepStore.setStep(3);
        this.canvas = new fabric.Canvas('c');
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.enqueueSnackbar("Step3", {
            variant: 'info'
        });
    }
    handleSubmit = () => {
        const createdId = this.props.authStore.isUserId;
        this.props.professionalLabelStore.changeNewProfessionalLabelCreatedId(createdId);
        this.props.professionalLabelStore.doProfessionalLabelUp();
        this.setState({
            tabIndex:1,
        })
        alert("저장 완료")
    }

    handleClickItem = (workNo, imageData) => {
        this.deleteAll();
        this.props.workStore.reSetCategoryItem();
        this.setState({
            tabIndex:0,
            tabIndex1:0,
        })

        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width : 650,
            height : 650,
            originX: 'left',
            originY: 'top'
        });
    }

    handleClickStyle=(selectedMainNo, selectedMainName, selectedSubNo,selectedSubName)=>{
        this.setState({
            selectedMainNo:selectedMainNo,
            selectedMainName:selectedMainName,
            selectedSubNo:selectedSubNo,
            selectedSubName:selectedSubName,
        })
    }

    deleteAll = () =>{
        let objList = [];
        this.canvas.getObjects().forEach(function (o) {
            objList.push(o);
        })
        for (let i = 0; i <= objList.length; i++) {
            this.canvas.remove(objList[i]);
        }
    }
    onSelectTab(tabIndex1) {
        let polyNo = tabIndex1;
        const {locationPolygonList} = this.props.polygonStore;
        console.log(locationPolygonList);
        console.log(locationPolygonList.length);
        if (locationPolygonList.length > 0 ) {
            const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));
            if (selectedPoly.length !== 0) {
                this.deleteAll();
                for (let i = 0; i < selectedPoly.length; i++) {
                    console.log(this.lineTwoPoint);
                    this.lineTwoPoint = [this.x, this.y, selectedPoly[i].locationX, selectedPoly[i].locationY];
                    this.x = selectedPoly[i].locationX;
                    this.y = selectedPoly[i].locationY;

                    if (i != 0) {
                        let x1 = this.lineTwoPoint[0];
                        let x2 = this.lineTwoPoint[2];
                        let x3 = 0;
                        let y1 = this.lineTwoPoint[1];
                        let y2 = this.lineTwoPoint[3];
                        let y3 = 0;
                        if (x2 < x1) {
                            x3 = x1;
                            x1 = x2;
                            x2 = x3;
                        }
                        if (y2 < y1) {
                            y3 = y1;
                            y1 = y2;
                            y2 = y3;
                        }
                        let polyline = new fabric.Line(
                            [this.lineTwoPoint[0],
                                this.lineTwoPoint[1],
                                this.lineTwoPoint[2],
                                this.lineTwoPoint[3]], {
                                id: this.lineCounter,
                                type: 'line',
                                fill: 'red',
                                stroke: 'red',
                                strokeWidth: 5,
                                padding: 1,
                                selectable: false,
                                evented: false,
                                left: x1,
                                top: y1,
                            });
                        this.canvas.add(polyline);
                        this.canvas.sendToBack(polyline);
                    }
                }
                let x1 = selectedPoly[selectedPoly.length - 1].locationX;
                let x2 = selectedPoly[0].locationX;
                let x3 = 0;
                let y1 = selectedPoly[selectedPoly.length - 1].locationY;
                let y2 = selectedPoly[0].locationY;
                let y3 = 0;
                this.lineTwoPoint = [x1, y1, x2, y2];
                if (x2 < x1) {
                    x3 = x1;
                    x1 = x2;
                    x2 = x3;
                }
                if (y2 < y1) {
                    y3 = y1;
                    y1 = y2;
                    y2 = y3;
                }
                let polyline = new fabric.Line(
                    [this.lineTwoPoint[0],
                        this.lineTwoPoint[1],
                        this.lineTwoPoint[2],
                        this.lineTwoPoint[3]], {
                        id: this.lineCounter,
                        type: 'line',
                        fill: 'red',
                        stroke: 'red',
                        strokeWidth: 5,
                        padding: 1,
                        selectable: false,
                        evented: false,
                        left: x1,
                        top: y1,
                    });
                this.canvas.add(polyline);
                this.canvas.sendToBack(polyline);

                this.setState({
                    tabIndex1: tabIndex1,
                })
            } else if (tabIndex1 == 0) {
                this.deleteAll();
                this.setState({
                    tabIndex1: tabIndex1,
                })
            } else {
                alert("poly정보가 존재하지 않습니다.")
            }
        }else{
            this.setState({
                tabIndex1: tabIndex1,
            })
        }
    };
    handleChange=(polyLast)=>{
        if(this.props.onChange){
            this.props.onChange(polyLast)
        }
    }
    handleLabel=(item)=>{
        this.props.workStore.LoadReviewLabelList(item.workNo);
    }

    render() {
        const {classes,history} = this.props;
        const polyLast = this.props.polygonStore;

            return (
                <Container component="main" className={classes.mainContainer}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.mainContent}>
                            <Grid item xs={12} style={{padding:3, textAlign:'center'}}>
                                <WorkedImg onClick={this.handleLabel} />
                            </Grid>
                        <Grid container>
                            <Grid item xs={12} lg={6} style={{marginTop:10}}>
                                <div>
                                    <canvas id="c" width={550} height={650} className={classes.canvas}>  </canvas>
                                </div>
                            </Grid>
                            <Grid item xs={12} lg={6} style={{marginLeft:"auto", marginTop:10}}>
                                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                        <TabList >
                                            <Tab tabIndex={0} style={{width: '50%', height:50,textAlign:'center'}}><h3>레이블링</h3></Tab>
                                            <Tab tabIndex={1} style={{width: '50%', height:50,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                                        </TabList>

                                        <TabPanel>
                                            <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab(tabIndex1)}>
                                        <TabList>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>스타일</h3></Tab>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>아우터</h3></Tab>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>상의</h3></Tab>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>하의</h3></Tab>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>원피스</h3></Tab>
                                        </TabList>

                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <Style onClick={this.handleClickStyle} />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent1 polyLast={polyLast} tabIndex1={this.state.tabIndex1} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent2 polyLast={polyLast} tabIndex1={this.state.tabIndex1} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent3 polyLast={polyLast} tabIndex1={this.state.tabIndex1} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent4 polyLast={polyLast} tabIndex1={this.state.tabIndex1} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                    </Tabs>
                                        </TabPanel>
                                     <TabPanel>

                                    <ProImageList onClick={this.handleClickItem} />
                                    </TabPanel>
                                    </Tabs>
                                </Grid>
                        </Grid>
                        <div>
                        <hr></hr>
                        </div>
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
                    </div>
                    <ErrorIcon/>
                    <Typography variant="h6" component="h4" style={{display:'inline'}}>
                        우측 상단에 이미지리스트에서 작업 할 이미지 선택 / 스타일 선택 완료 후 영역정보가 존재하는 탭(아우터, 상의, 하의, 원피스)에서 세부항목 선택 / 영역정보가 존재하는 마지막 탭 입력 후 저장버튼 클릭
                    </Typography>
                </Container>
            );
        }
    };
export default withSnackbar(withRouter(withStyles(styles) (Step3)));