import React from 'react';
import {connect} from "react-redux";
import {setProperty} from "../../actions/genericActions";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import LevelingSpeed from "../../enums/creationPage/LevelingSpeed";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


type StateProps = {
    levelingSpeed: LevelingSpeed,
    fractionalBab: boolean,
    randomStartingHealth: boolean,
    randomLevelingHealth: boolean,
    randomStartingWealth: boolean,
    modalVisible: boolean
}

type OwnProps = {}

type DispatchProps = {
    setProperty: Function;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps = (state): StateProps => {
    return {
        levelingSpeed: state.creationSettings.levelingSpeed,
        fractionalBab: state.creationSettings.fractionalBab,
        randomStartingHealth: state.creationSettings.randomStartingHealth,
        randomLevelingHealth: state.creationSettings.randomLevelingHealth,
        randomStartingWealth: state.creationSettings.randomStartingWealth,
        modalVisible: state.ui.creationSettingsModalVisible
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        setProperty: (type, value) => dispatch(setProperty(type, value))
    };
};

export class CreationSettings extends React.Component<Props, {}> {

    levelingSpeedList: any;
    visible: boolean;

    constructor(props: Props) {
        super(props);
        this.handleCheckboxUpdate = this.handleCheckboxUpdate.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.visible = false;
        this.levelingSpeedList = [
            LevelingSpeed.SLOW,
            LevelingSpeed.MEDIUM,
            LevelingSpeed.FAST
        ]
    }

    handleInputUpdate(event, property) {
        this.props.setProperty(property, event.target.value);
    }

    handleCheckboxUpdate(event, property) {
        this.props.setProperty(property, event.target.checked);
    }

    toggleModal() {
        this.props.setProperty('creation_settings_modal_visible', !this.props.modalVisible);
    }

    public render() {
        return (
            <div className="creation-settings">
                <Button color="danger" onClick={this.toggleModal}>Creation Settings</Button>
                <Modal isOpen={this.props.modalVisible} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Creation Settings</ModalHeader>
                    <ModalBody>
                        Fractional BAB: <input type="checkbox" checked={this.props.fractionalBab}
                                               onChange={event => this.handleCheckboxUpdate(event, 'fractional_bab')}/>
                        Random Starting Wealth: <input type="checkbox" checked={this.props.randomStartingWealth}
                                                       onChange={event => this.handleCheckboxUpdate(event, 'random_starting_wealth')}/>
                        Random Starting Health: <input type="checkbox" checked={this.props.randomStartingHealth}
                                                       onChange={event => this.handleCheckboxUpdate(event, 'random_starting_health')}/>
                        Random Leveling Health: <input type="checkbox" checked={this.props.randomLevelingHealth}
                                                       onChange={event => this.handleCheckboxUpdate(event, 'random_leveling_health')}/>
                        {/*Leveling speed: <DropDownList defaultValue={this.props.levelingSpeed}*/}
                        {/*                              data={this.levelingSpeedList}*/}
                        {/*                              onChange={event => this.handleInputUpdate(event, 'leveling_speed')}/>*/}
                        Leveling Speed: <input defaultValue={this.props.levelingSpeed}
                                      onInput={event => this.handleInputUpdate(event, 'leveling_speed')}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

let CreationSettingsConnected = connect(mapStateToProps, mapDispatchToProps)(CreationSettings);
export default CreationSettingsConnected;
