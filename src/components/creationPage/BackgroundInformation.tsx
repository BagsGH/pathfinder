import React from 'react';
import {connect} from "react-redux";
import './BackgroundInformation.scss';
import {setAlignment, setCharacterName, setRace} from "../../actions/backgroundInformationActions";
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {filterBy} from '@progress/kendo-data-query';

type StateProps = {
    characterName: string;
    alignments: any;
    races: any;
}

type OwnProps = {}

type DispatchProps = {
    setCharacterName: any;
    setAlignment: any;
    setRace: any;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps = (state): StateProps => {
    return {
        characterName: state.bg.characterName,
        alignments: state.bg.alignments,
        races: state.bg.races
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        setCharacterName: name => dispatch(setCharacterName(name)),
        setAlignment: alignment => dispatch(setAlignment(alignment)),
        setRace: race => dispatch(setRace(race))
    };
};

export class BackgroundInformation extends React.Component<Props, {}> {

    raceList: any;

    constructor(props: Props) {
        super(props);
        this.handleCharacterNameUpdate = this.handleCharacterNameUpdate.bind(this);
        this.handleAlignmentUpdate = this.handleAlignmentUpdate.bind(this);
        this.handleRaceUpdate = this.handleRaceUpdate.bind(this);
        this.raceFilterChange = this.raceFilterChange.bind(this);
        this.raceList = this.props.races.slice();
    }

    handleCharacterNameUpdate(event) {
        this.props.setCharacterName(event.target.value);
    }

    handleAlignmentUpdate(event) {
        this.props.setAlignment(event.target.value);
    }

    handleRaceUpdate(event) {
        this.props.setRace(event.target.value.text);
    }

    raceFilterChange(event) {
        this.raceList = BackgroundInformation.filterList(event.filter, this.props.races.slice());
        this.forceUpdate();
    }

    static filterList(filter, list) {
        return filterBy(list, filter);
    }

    public render() {
        return (
            <div className="background-information">
                Character Name <input defaultValue={this.props.characterName} onInput={this.handleCharacterNameUpdate}/>
                Alignment <DropDownList data={this.props.alignments} onChange={this.handleAlignmentUpdate}/>
                Race <DropDownList
                data={this.raceList}
                textField="text"
                filterable={true}
                onFilterChange={this.raceFilterChange}
                onChange={this.handleRaceUpdate}/>
            </div>
        );
    }
}

let BackgroundInformationConnected = connect(mapStateToProps, mapDispatchToProps)(BackgroundInformation);
export default BackgroundInformationConnected;
