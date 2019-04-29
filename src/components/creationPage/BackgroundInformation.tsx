import React from 'react';
import {connect} from "react-redux";
import './BackgroundInformation.scss';
import {setProperty} from "../../actions/genericActions";
import {DropDownList} from '@progress/kendo-react-dropdowns';
//@ts-ignore -- this exists and works...
import {filterBy} from '@progress/kendo-data-query';
import alignments from "../../resources/json/misc/alignment.json";
import MiscDataLoader from "../../data/MiscDataLoader";

type StateProps = {
    characterName: string;
    race: string;
    levels: number;
    alignment: string;
    deity: string;
    gender: string;
    weight: string;
    height: string;
    races: any;
}

type OwnProps = {}

type DispatchProps = {
    setProperty: Function;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps = (state): StateProps => {
    return {
        characterName: state.bg.characterName,
        race: state.bg.race,
        levels: state.levels.levels.length,
        alignment: state.bg.alignment,
        deity: state.bg.deity,
        gender: state.bg.gender,
        weight: state.bg.weight,
        height: state.bg.height,
        races: state.bg.races
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        setProperty: (type, value) => dispatch(setProperty(type, value))
    };
};

export class BackgroundInformation extends React.Component<Props, {}> {

    raceList: any;
    deityList: any;

    constructor(props: Props) {
        super(props);
        this.handleInputUpdate = this.handleInputUpdate.bind(this);
        this.handleFilteredUpdate = this.handleFilteredUpdate.bind(this);
        this.filterChange = this.filterChange.bind(this);
        this.raceList = this.props.races.slice();
        this.deityList = MiscDataLoader.deities().slice();
    }

    handleInputUpdate(event, property) {
        this.props.setProperty(property, event.target.value);
    }

    handleFilteredUpdate(event, property) {
        this.props.setProperty(property, event.target.value.text);
    }

    filterChange(event, listName, originalList) {
        this[listName] = filterBy(originalList.slice(), event.filter);
        this.forceUpdate();
    }

    public render() {
        return (
            <div className="background-information">
                Character Name <input defaultValue={this.props.characterName}
                                      onInput={event => this.handleInputUpdate(event, 'character_name')}/>
                Alignment <DropDownList data={alignments.alignments}
                                        onChange={event => this.handleInputUpdate(event, 'alignment')}/>
                Race <DropDownList
                defaultValue={this.props.race}
                data={this.raceList}
                textField="text"
                filterable={true}
                onFilterChange={event => this.filterChange(event, 'raceList', this.props.races)}
                onChange={event => this.handleFilteredUpdate(event, 'race')}/>

                Level <input defaultValue={this.props.levels+''}
                              onInput={event => this.handleInputUpdate(event, 'levels')}/>

                Deity <DropDownList
                defaultValue={this.props.deity}
                data={this.deityList}
                textField="text"
                filterable={true}
                onFilterChange={event => this.filterChange(event, 'deityList', MiscDataLoader.deities())}
                onChange={event => this.handleFilteredUpdate(event, 'deity')}/>

                Gender <input defaultValue={this.props.gender}
                              onInput={event => this.handleInputUpdate(event, 'gender')}/>
                Weight <input defaultValue={this.props.weight}
                              onInput={event => this.handleInputUpdate(event, 'weight')}/>
                Height <input defaultValue={this.props.height}
                              onInput={event => this.handleInputUpdate(event, 'height')}/>
            </div>
        );
    }
}

let BackgroundInformationConnected = connect(mapStateToProps, mapDispatchToProps)(BackgroundInformation);
export default BackgroundInformationConnected;
