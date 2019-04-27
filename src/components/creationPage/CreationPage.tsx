import React from 'react';
import {connect} from "react-redux";
import {Store} from "redux";
import './CreationPage.scss';
import BackgroundInformationConnected, {BackgroundInformation} from "./BackgroundInformation";

type StateProps = {
    testValue: string;
}

type OwnProps = {
    store?: Store;
}

type Props = StateProps & OwnProps;

const mapStateToProps = (state): StateProps => {
    return {
        testValue: state.test.testValue
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export class CreationPage extends React.Component<Props, {}> {

    store: Store;

    constructor(props: Props) {
        super(props);
        // this.store = props.store ?  props.store : store;
        // console.log('props', props);
        // console.log(this.store.dispatch(testAction()));
    }

    public render() {
        return (
            <div className="creation-page">
                <div>
                    <BackgroundInformationConnected/>

                </div>
            </div>
        );
    }
}

let CreationPageConnected = connect(mapStateToProps)(CreationPage);
export default CreationPageConnected;
