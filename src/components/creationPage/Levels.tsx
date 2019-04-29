import React from 'react';
import {connect} from "react-redux";
import {setProperty} from "../../actions/genericActions";
import LevelConnected from "./Level";


type StateProps = {
    levels: any;
}

type OwnProps = {}

type DispatchProps = {
    setProperty: Function;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps = (state): StateProps => {
    return {
        levels: state.levels.levels
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        setProperty: (type, value) => dispatch(setProperty(type, value))
    };
};

export class Levels extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
        this.renderLevels = this.renderLevels.bind(this);
    }

    renderLevels() {
        let levelsToRender = [];
        this.props.levels.forEach(level => {
            levelsToRender.push(<LevelConnected key={'individualLevel-' + level.level} level={level.level}
                                                pfClass={level.pfClass}/>)
        });

        return levelsToRender;
    }


    public render() {
        return (
            <div className="levels">
                Levels
                {
                    this.renderLevels()
                }
            </div>
        );
    }
}

let LevelsConnected = connect(mapStateToProps, mapDispatchToProps)(Levels);
export default LevelsConnected;
