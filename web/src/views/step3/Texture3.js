import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

@inject('professionalLabelStore','authStore')
@observer
export default class Texture1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            textureList3: [],
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/texture')
            .then(response => {
                const textureList3 = response.data.textureList3;
                this.setState({ textureList3 : textureList3})
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
    handleClick(texture){
        if(this.props.onClick) {
            this.props.onClick(texture);
        }
        this.setState({
            open:false,
        })

    }
    render() {
        const textureList3= this.state.textureList3;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            소재감
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {textureList3.map((texture) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:10}}>
                                        <Button style={{width:'100%', height:60, padding:0}} variant="outlined" key={texture.no} onClick={() => this.handleClick(texture)}>
                                            <h2>{texture.categoryItemName}</h2>
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