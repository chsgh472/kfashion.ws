import React from 'react';
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
import Button from "@material-ui/core/Button";
import {DropzoneDialog} from "material-ui-dropzone";

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

export default class CreateGroupDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    state = {
        text: 'text',
        data: [
            {no: '1', group_name: '이화여자대학교', createdDateTime: '1994-11-23T08:15:30-05:00', updatedDateTime: new Date() },
            {no: '2', group_name: '아이테르대학교', createdDateTime: '1994-11-23T08:15:30-05:00', updatedDateTime: new Date() },
            {no: '3', group_name: '교마이스터고', createdDateTime: '1994-11-23T08:15:30-05:00', updatedDateTime: new Date() },
        ],
        columns: [
            { title: '그룹번호', field: 'no', filterPlaceholder: 'GroupNo filter', tooltip: 'GroupNo로 정렬', editPlaceholder: 'GroupNo 입력' },
            { title: '소속', field: 'group_name', initialEditValue: 'test', tooltip: 'This is tooltip text' },
            { title: '생성일', field: 'createdDateTime', type: 'datetime' },
            { title: '수정일', field: 'updatedDateTime', type: 'datetime' },
        ],
    }


    handleClose() {
        this.setState({
            open: false
        });
    }
    handleOpen() {
        this.setState({
            open: true,
        });
    }
    handleSave(file){
        this.setState({
            open: false,
        });
        this.props.fileUploadStore.fileupload(file);
    }
    render() {
        return (
            <div>
            <Button onClick={this.handleOpen.bind(this)} variant="contained"
                    color="primary">
                그룹생성
            </Button>

            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    open={this.state.open}
                    icons={tableIcons}
                    columns={this.state.columns}
                    onSave={this.handleSave.bind(this)}
                    data={this.state.data}
                    onClose={this.handleClose.bind(this)}
                    showPreviews={true}
                    title="그룹생성"
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        /* const data = this.state.data;
                                        data.push(newData);
                                        this.setState({ data }, () => resolve()); */
                                    }
                                    resolve();
                                }, 1000);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        /* const data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data[index] = newData;
                                        this.setState({ data }, () => resolve()); */
                                    }
                                    resolve();
                                }, 1000);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        /* let data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data.splice(index, 1);
                                        this.setState({ data }, () => resolve()); */
                                    }
                                    resolve();
                                }, 1000);
                            })
                    }}
                />
            </div>
            </div>
        );
    }
}