import React from 'react';
import {connect} from "react-redux";
import {setProperty} from "../../actions/genericActions";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import LevelingSpeed from "../../enums/creationPage/LevelingSpeed";

type StateProps = {
    levelingSpeed: LevelingSpeed,
    fractionalBab: boolean,
    randomStartingHealth: boolean,
    randomLevelingHealth: boolean,
    randomStartingWealth: boolean
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
        randomStartingWealth: state.creationSettings.randomStartingWealth
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        setProperty: (type, value) => dispatch(setProperty(type, value))
    };
};

export class CreationSettings extends React.Component<Props, {}> {

    levelingSpeedList: any;

    constructor(props: Props) {
        super(props);
        this.handleCheckboxUpdate = this.handleCheckboxUpdate.bind(this);
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

    public render() {
        return (
            <div className="creation-settings">
                Fractional BAB: <input type="checkbox" checked={this.props.fractionalBab}
                                       onChange={event => this.handleCheckboxUpdate(event, 'fractional_bab')}/>
                Random Starting Wealth: <input type="checkbox" checked={this.props.randomStartingWealth}
                                               onChange={event => this.handleCheckboxUpdate(event, 'random_starting_wealth')}/>
                Random Starting Health: <input type="checkbox" checked={this.props.randomStartingHealth}
                                               onChange={event => this.handleCheckboxUpdate(event, 'random_starting_health')}/>
                Random Leveling Health: <input type="checkbox" checked={this.props.randomLevelingHealth}
                                               onChange={event => this.handleCheckboxUpdate(event, 'random_leveling_health')}/>
                Leveling speed: <DropDownList defaultValue={this.props.levelingSpeed} data={this.levelingSpeedList}
                                              onChange={event => this.handleInputUpdate(event, 'leveling_speed')}/>
            </div>
        );
    }
}

let CreationSettingsConnected = connect(mapStateToProps, mapDispatchToProps)(CreationSettings);
export default CreationSettingsConnected;
