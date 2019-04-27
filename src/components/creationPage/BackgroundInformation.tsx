import React from 'react';
import {connect} from "react-redux";
import {Store} from "redux";
import './BackgroundInformation.scss';
import {setCharacterName} from "../../actions/backgroundInformationActions";

type StateProps = {
    characterName: string;
}

type OwnProps = {
    store?: Store;
}

type DispatchProps = {
    setCharacterName: any;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps = (state): StateProps => {
    return {
        characterName: state.bg.characterName
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        setCharacterName: (name) => {
            dispatch(setCharacterName(name))
        }
    };
};

export class BackgroundInformation extends React.Component<Props, {}> {

    store: Store;

    constructor(props: Props) {
        super(props);
        // this.store = props.store ?  props.store : store;
        // console.log('props', props);
        // console.log(this.store.dispatch(testAction()));
        this.handleCharacterNameUpdate = this.handleCharacterNameUpdate.bind(this);
    }

    handleCharacterNameUpdate(event) {
        this.props.setCharacterName(event.target.value);
    }

    public render() {
        return (
            <div className="background-information">
                Character Name <input defaultValue={this.props.characterName} onInput={this.handleCharacterNameUpdate}/>
            </div>
        );
    }
}

let BackgroundInformationConnected = connect(mapStateToProps, mapDispatchToProps)(BackgroundInformation);
export default BackgroundInformationConnected;
