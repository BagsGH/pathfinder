import React from 'react';
import {connect} from "react-redux";
import {setProperty} from "../../actions/genericActions";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {setLevelsClass} from "../../actions/backgroundInformationActions";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import {filterBy} from "@progress/kendo-data-query";

type StateProps = {}

type OwnProps = {
    level: number,
    pfClass: string
}

type DispatchProps = {
    setLevelsClass: Function;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps = (state): StateProps => {
    return {};
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        setLevelsClass: (level, pfClass) => dispatch(setLevelsClass(level, pfClass))
    };
};

export class Level extends React.Component<Props, {}> {

    pfClasses: any;
    pfClassList: any;

    constructor(props: Props) {
        super(props);
        this.handleFilteredUpdate = this.handleFilteredUpdate.bind(this);
        this.pfClasses = [
            {id: 1, text: 'Sorcerer'},
            {id: 2, text: 'Alchemist'},
            {id: 3, text: 'Fighter'},
            {id: 4, text: 'Magus'},
            {id: 5, text: 'Bard'},
        ];
        this.pfClassList = this.pfClasses.slice();
    }

    handleFilteredUpdate(event) {
        this.props.setLevelsClass(this.props.level, event.target.value.text);
    }

    filterChange(event, listName, originalList) {
        this[listName] = filterBy(originalList.slice(), event.filter);
        this.forceUpdate();
    }

    //TODO: lookup hitdice and display that next to the class
    public render() {
        return (
            <div className="level">
                {this.props.level} - <DropDownList
                defaultValue={this.props.pfClass}
                data={this.pfClassList}
                textField="text"
                filterable={true}
                onFilterChange={event => this.filterChange(event, 'pfClassList', this.pfClasses)}
                onChange={event => this.handleFilteredUpdate(event)}/>
            </div>
        );
    }
}

let LevelConnected = connect(mapStateToProps, mapDispatchToProps)(Level);
export default LevelConnected;
