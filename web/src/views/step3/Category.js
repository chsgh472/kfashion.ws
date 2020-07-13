import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
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
export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            categoryList: [
                ],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/category')
            .then(response => {
                const categoryList = response.data.categoryList;
                this.setState({categoryList:categoryList})
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
    handleClick(category){
        if(this.props.onClick) {
            this.props.onClick(category);
        }
        this.setState({
            open:false,
        })

    }

    render() {
        const categoryList= this.state.categoryList;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"md"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            카테고리
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {categoryList.map((category) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:10}}>
                                        <Button style={{width:'100%', height:60}} variant="outlined" key={category.no} onClick={() => this.handledDetail(category)}>
                                            <h2>{category.categoryItemName}</h2>
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