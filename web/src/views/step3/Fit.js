import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('professionalLabelStore','authStore')
@observer
export default class ColorKara extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            fitList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/fit')
            .then(response => {
                const fitList = response.data.fitList;
                this.setState({ fitList : fitList.map(fit => {
                        fit.value = fit.no;
                        fit.label = fit.categoryItemName;
                        return fit
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.props.professionalLabelStore.changeNewProfessionalLabelFit(selectedOption);
        this.setState(
            { selectedOption },
        );
    };

    render() {
        const { selectedOption } = this.state;
        const fitList= this.state.fitList;
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={fitList}
                placeholder={'핏을 선택 하세요'}
            />
        );
    }
}