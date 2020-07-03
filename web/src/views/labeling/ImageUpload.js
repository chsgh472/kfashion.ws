import React from "react";
import {withSnackbar} from "notistack";
import {Link, withRouter, Router, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Container, Toolbar, Typography, Button, Grid,} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import DropzoneDialogExample from "../../components/DropzoneDialog";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from "axios";


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
const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
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
    imgLayout:{
        maxWidth: 600,
        maxHeight: 600,
    }
});


@inject('fileUploadStore','authStore','imageStore')
@observer
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: 'text',
            boundaryList: [],
            imgData : '',
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
            ],
        }
    }
    componentDidMount() {
        this.props.enqueueSnackbar("Image Upload", {
            variant: 'info'
        });
        this.props.authStore.checkLogin();
        this.setState({ open : false })
        const createdId = this.props.authStore.loginUser.id;

        axios.get('/api/v1/kfashion/img/boundaryList?createdId='+createdId)
            .then(response => {
                this.setState({ boundaryList : response.data.boundaryList.filter(b =>b !==null)})
                this.setState({ imgData : `/api/v1/kfashion/img/getByteImage?workNo=${this.state.boundaryList[0].workNo}`});
            })
            .catch(error => {
                console.log(error)
            })
    }
    handlePrevious(){
        this.setState({count: this.state.count-1})
        { 0 < this.state.count ? this.setState({imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.state.boundaryList[this.state.count].workNo}`})
                : this.setState({count: this.state.boundaryList.length})
            console.log(this.state.count)
        }
    }
    handleNext(){
        this.setState({count: this.state.count+1});
        {this.state.count < this.state.boundaryList.length ? this.setState({imgData : `/api/v1/kfashion/img/getByteImage?workNo=${this.state.boundaryList[this.state.count].workNo}`} )
            : this.setState({count: 0})
        }
        console.log(this.state.count)
    }
    render() {
        const {boundaryList} = this.state;
        const {classes, history} = this.props;
        this.props.imageStore.changeImgData(this.state.imgData)
        return (
            <Container component="main" className={classes.mainContainer}>
                {/*Stepper*/}
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Toolbar className={classes.toolbar}>
                        <Grid container>
                            <Grid item xs={2} style={{marginRight:5}}>
                                <DropzoneDialogExample />
                            </Grid>
                        </Grid>
                    </Toolbar>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <div style={{marginRight:15}}>
                                <img src={this.state.imgData} style={{display:"block" , width:'100%', height:'100%'}}/>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <div>
                            <MaterialTable
                                icons={tableIcons}
                                columns={this.state.columns}
                                data={boundaryList}
                                title="이미지 리스트"
                                editable={{
                                    onRowDelete: oldData =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                {
                                                    let data = this.state.data;
                                                    const index = data.indexOf(oldData);
                                                    data.splice(index, 1);
                                                    this.setState({ data }, () => resolve());
                                                }
                                                resolve();
                                            }, 1000);
                                        }),
                                }}
                                actions={[
                                    {
                                        icon: Edit,
                                        tooltip: 'Select Image',
                                        onClick: (event, rowData) => {
                                            this.setState({imgData : "/api/v1/kfashion/img/getByteImage?workNo="+rowData.workNo})
                                            /*this.setState({count:rowData.indexOf()})*/
                                            console.log(rowData);
                                        }
                                    }
                                ]}
                            />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <hr></hr>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handlePrevious.bind(this)}
                         >
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleNext.bind(this)}
                         >
                        Next
                    </Button>
                    <Button
                        type="button"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick={()=>history.push('/step/boundaryBox')}
                        >
                        Next Step
                    </Button>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (ImageUpload)));