import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Typography, Grid} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


@inject('professionalLabelStore','authStore')
@observer
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            detailList: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/detail')
            .then(response => {
                const detailList = response.data.detailList;
                this.setState({ detailList : detailList})
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClickOpen() {
        this.setState({
            open: true
        });
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleClick(detail){
        if(this.props.onClick) {
            this.props.onClick(detail);
        }
        this.setState({
            open:false,
        })

    }
    handledDetail=(detail)=>{
        if(this.props.onClick) {
            this.props.onClick(detail);
        }
        this.setState({
            open: false
        });
    }
    render() {
        const detailList= this.state.detailList;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"lg"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            디테일
                        </Typography>
                        <hr></hr>
                            <Grid container>
                                        {detailList.map((detail) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:10}}>
                                            <Button style={{width:'100%', height:60}} variant="outlined" key={detail.no} onClick={() => this.handledDetail(detail)}>
                                                <h2>{detail.categoryItemName}</h2>
                                            </Button>
                                    </div>
                                </Grid>
                                        )
                                        }
                            </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}