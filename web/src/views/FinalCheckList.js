import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Edit from '@material-ui/icons/Edit';
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';
import {Button, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import 'react-tabs/style/react-tabs.css';
import Stepper from "../components/Stepper";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {fabric} from "fabric";
import {toJS} from "mobx";

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
        marginTop:20,
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
    test:{
        border:'1px solid black',
        height: '50%',
    },
    toolBox:{
        border:'1px solid black',
        marginRight: 1,
        height:'100%',
    },
    fileText: {
        paddingTop: 32,
        paddingRight: theme.spacing(2),
        textAlign: 'left'
    },
    filebox: {
        paddingTop: 35,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
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
    },
});

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

@inject('professionalLabelStore','authStore', 'imageStore', 'currentStepStore','workStore', 'polygonStore')
@observer
class FinalCheckList extends React.Component {
    constructor(props) {
        super(...arguments , props);
        this.state = {
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
            tapIndex: 0,
            createdId: '',
            boundaryList: [],
            imgData:'',
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'numeric', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'string', render : rowData => <img src={rowData.fileName} style={{width: 50, height:50,}}/> },
                {title: '이름', field: 'workName',type: 'string', filterPlaceholder: 'GroupNo filter',},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
                {title: '생성자', field: 'createdId', type: 'string'},
            ],
        }
    }

    componentWillUnmount() {
        this.props.imageStore.initStore();
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c');
        this.props.currentStepStore.setStep(4);
        this.props.imageStore.LoadInspectionList();
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.enqueueSnackbar("FinalCheck", {
            variant: 'info'
        });
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })


    }
    handleClick=(workNo, imgData)=>{
        this.deleteAll();
        console.log(workNo);
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(workNo);
        this.props.workStore.LoadReviewLabelList(workNo);

        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: 650,
            height: 700,
            originX: 'left',
            originY: 'top'
        });
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


    onSelectTab(tabIndex) {
        let polyNo = tabIndex + 1;
        const {locationPolygonList} = this.props.polygonStore;
        const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));
        if (selectedPoly.length !== 0) {
            this.deleteAll();
            for(let i = 0 ; i <selectedPoly.length; i++) {
                this.lineTwoPoint = [this.x, this.y, selectedPoly[i].locationX, selectedPoly[i].locationY];
                this.x = selectedPoly[i].locationX;
                this.y = selectedPoly[i].locationY;

                if(i !=0) {
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
            let x1 = selectedPoly[selectedPoly.length-1].locationX;
            let x2 = selectedPoly[0].locationX;
            let x3 = 0;
            let y1 = selectedPoly[selectedPoly.length-1].locationY;
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
                tabIndex1: tabIndex,
            })
        }else{
            this.deleteAll();
            this.setState({
                tabIndex1: tabIndex,
            });
        }
    }

    handleClickReturn=(workNo)=>{
        this.props.professionalLabelStore.LoadLabelList(workNo);
        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        this.props.history.push("/Step2/ModifyStep3");
    }

    render() {
        const {classes} = this.props;
        const {outerReviewLabel, topReviewLabel, pantsReviewLabel, onePieceReviewLabel, styleReviewLabel} =this.props.workStore;

        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={4}>
                            <div>
                                <canvas id="c" width="600" height="650">  </canvas>
                            </div>
                        </Grid>
                        <Grid item xs={3} style={{marginRight:20}}>
                            <div component={Paper}>
                                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.onSelectTab(tabIndex)}>
                                    <TabList >
                                        <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3>아우터</h3></Tab>
                                        <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3>상의</h3></Tab>
                                        <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3>하의</h3></Tab>
                                        <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3>원피스</h3></Tab>
                                    </TabList>
                                    <TabPanel>
                                        <TableContainer  style={{height:'60vh'}}>
                                            <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">항목</TableCell>
                                                        <TableCell align="center">레이블링</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 : {styleReviewLabel.styleItemName} 서브 : {styleReviewLabel.styleSubItemName ? styleReviewLabel.styleSubItemName : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">카테고리</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.categoryItemName1}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">디테일</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.detailItemName1}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">프린트</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.printItemName1}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">소재</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.textureItemName1}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">기장</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.clothLengthItemName1}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">넥라인</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.neckLineItemName1}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">칼라</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.karaItemName1}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">핏</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.fitItemName1}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel>
                                        <TableContainer  style={{height:'60vh'}}>
                                            <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">항목</TableCell>
                                                        <TableCell align="center">레이블링</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 : {styleReviewLabel.styleItemName} 서브 : {styleReviewLabel.styleSubItemName ? styleReviewLabel.styleSubItemName : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">카테고리</TableCell>
                                                        <TableCell align="center">{topReviewLabel.categoryItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">디테일</TableCell>
                                                        <TableCell align="center">{topReviewLabel.detailItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">프린트</TableCell>
                                                        <TableCell align="center">{topReviewLabel.printItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">소재</TableCell>
                                                        <TableCell align="center">{topReviewLabel.textureItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">기장</TableCell>
                                                        <TableCell align="center">{topReviewLabel.clothLengthItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">넥라인</TableCell>
                                                        <TableCell align="center">{topReviewLabel.neckLineItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">칼라</TableCell>
                                                        <TableCell align="center">{topReviewLabel.karaItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">핏</TableCell>
                                                        <TableCell align="center">{topReviewLabel.fitItemName2}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel>
                                        <TableContainer  style={{height:'60vh'}}>
                                            <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">항목</TableCell>
                                                        <TableCell align="center">레이블링</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 : {styleReviewLabel.styleItemName} 서브 : {styleReviewLabel.styleSubItemName ? styleReviewLabel.styleSubItemName : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">카테고리</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.categoryItemName3}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">디테일</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.detailItemName3}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">프린트</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.printItemName3}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">소재</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.textureItemName3}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">기장</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.clothLengthItemName3}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">핏</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.fitItemName3}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel>
                                        <TableContainer  style={{height:'60vh'}}>
                                            <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">항목</TableCell>
                                                        <TableCell align="center">레이블링</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 : {styleReviewLabel.styleItemName} 서브 : {styleReviewLabel.styleSubItemName ? styleReviewLabel.styleSubItemName : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">카테고리</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.categoryItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">디테일</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.detailItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">프린트</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.printItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">소재</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.textureItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">기장</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.clothLengthItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">넥라인</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.neckLineItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">칼라</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.karaItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">핏</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.fitItemName4}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <MaterialTable
                                icons={tableIcons}
                                columns={this.state.columns}
                                data={!!this.props.imageStore.inspectionList ?
                                    this.props.imageStore.inspectionList.map((item) => {
                                        return {
                                            workNo: item.workNo,
                                            fileName: item.fileName,
                                            workName: item.workName,
                                            createdDatetime: item.createdDatetime,
                                            createdId: item.createdId,
                                        }
                                    }) : []}
                                title="이미지 리스트"
                                options={{
                                    search: true,
                                    actionsColumnIndex: -1,
                                }}
                                actions={
                                    [
                                        {
                                            icon: CheckIcon,
                                            tooltip: 'Select Image',
                                            onClick: (event, rowData) => this.handleClick(rowData.workNo, "/api/v1/kfashion/img/getByteImage?workNo=" + rowData.workNo)
                                        },
                                        // rowData => ({
                                        //     icon: Edit,
                                        //     tooltip: 'return',
                                        //     hidden: rowData.createdId !== this.props.authStore.loginUser.id,
                                        //     onClick: (event, rowData) => this.handleClickReturn(rowData.workNo)
                                        // })
                                    ]
                                }
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (FinalCheckList)));