import React from 'react';
import {connect} from "react-redux";
import {setProperty} from "../../actions/genericActions";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {setLevelsClass} from "../../actions/backgroundInformationActions";


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

    constructor(props: Props) {
        super(props);
        this.handleInputUpdate = this.handleInputUpdate.bind(this);
    }

    handleInputUpdate(event) {
        this.props.setLevelsClass(this.props.level, event.target.value);
    }

    //TODO: Replace input with list
    public render() {
        return (
            <div className="level">
                {this.props.level} - <input defaultValue={this.props.pfClass}
                                            onInput={event => this.handleInputUpdate(event)}
            />
            </div>
        );
    }
}

let LevelConnected = connect(mapStateToProps, mapDispatchToProps)(Level);
export default LevelConnected;
