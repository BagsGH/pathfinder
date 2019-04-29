import React from 'react';
import {connect} from "react-redux";
import DiceUtils from "../../utils/DiceUtils";
import * as _find from 'lodash/find';
import as from "./../../resources/json/misc/abilityScoreCosts.json";
import {setAbilityScore} from "../../actions/StatisticActions";
import MiscDataLoader from "../../data/MiscDataLoader";


type StateProps = {
    abilityScoreDetermination: string;
    abilityScores: []
}

type OwnProps = {}

type DispatchProps = {
    setAbilityScore: Function;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapStateToProps = (state): StateProps => {
    return {
        abilityScoreDetermination: state.creationSettings.abilityScoreDetermination,
        abilityScores: state.statistics.abilityScores
    };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        setAbilityScore: (name, value) => dispatch(setAbilityScore(name, value))
    };
};

export class AbilityScores extends React.Component<Props, {}> {

    calculationMap: any;
    abilityScoresCostMap: any;
    rolledScores: any;

    constructor(props: Props) {
        super(props);
        this.calculateAbilityScoreDisplay = this.calculateAbilityScoreDisplay.bind(this);
        this.handleAbilityScoreUpdate = this.handleAbilityScoreUpdate.bind(this);
        this.renderScores = this.renderScores.bind(this);
        this.renderPointBuyTotalCost = this.renderPointBuyTotalCost.bind(this);
        this.abilityScoreFromState = this.abilityScoreFromState.bind(this);
        this.rolledScores = new Map();

        //TODO: better way to handle this... maybe set default state to undefined, and map undefined to 10 for 'self entered'and pb
        this.rolledScores.set('str', false);
        this.rolledScores.set('dex', false);
        this.rolledScores.set('con', false);
        this.rolledScores.set('wis', false);
        this.rolledScores.set('int', false);
        this.rolledScores.set('cha', false);

        this.abilityScoresCostMap = MiscDataLoader.abilityScoreCostMap();

        this.calculationMap = {
            '4d6 - drop smallest': (name) => {
                if(!this.rolledScores.get(name)) {
                    let roll = DiceUtils.rollAbilityScores4d6();
                    this.rolledScores.set(name, true);
                    this.props.setAbilityScore(name, roll);
                    return roll;
                }
                else {
                    return this.abilityScoreFromState(name);
                }
            },
            'Self-Entered': () => {
                return '';
            },
            '3d6 - re-roll 1s':  (name) => {
                if(!this.rolledScores.get(name)) {
                    let roll = DiceUtils.rollAbilityScores4d6();
                    this.rolledScores.set(name, true);
                    this.props.setAbilityScore(name, roll);
                    return roll;
                }
                else {
                    return this.abilityScoreFromState(name);
                }
            },
            'Point buy: 10': (name) => this.abilityScoreFromState(name),
            'Point buy: 15': (name) => this.abilityScoreFromState(name),
            'Point buy: 20': (name) => this.abilityScoreFromState(name),
            'Point buy: 25': (name) => this.abilityScoreFromState(name)
        };
    }

    abilityScoreFromState(name): number {
        return _find(this.props.abilityScores, abilityScore => {
            return abilityScore.name === name;
        }).value;
    }

    calculateAbilityScoreDisplay(abilityScoreName) {
        let abilityScore = _find(abilityScoreName, abilityScore => {
            return abilityScore.name === abilityScore && typeof abilityScore.value !== 'undefined'
        });
        return abilityScore ? abilityScore.value : this.calculationMap[this.props.abilityScoreDetermination](abilityScoreName);
    }

    handleAbilityScoreUpdate(event, name) {
        if (parseInt(event.target.value) >= 7) {
            this.props.setAbilityScore(name, event.target.value);
        }
    }

    renderPointBuyTotalCost() {
        if (this.props.abilityScoreDetermination.toLowerCase().includes('point')) {
            let cost = 0;
            this.props.abilityScores.forEach(abilityScore => {
                //@ts-ignore -- value property is clearly there
                cost += this.abilityScoresCostMap.get(abilityScore.value)
            });
            return <div>{cost}</div>
        }
        return null;
    }

    renderScores() {
        let render = [];
        if (this.props.abilityScoreDetermination.toLowerCase().includes('point')) {
            render.push(<div>STR <input defaultValue={this.calculateAbilityScoreDisplay('str') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'str')}/></div>);
            render.push(<div>DEX <input defaultValue={this.calculateAbilityScoreDisplay('dex') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'dex')}/></div>);
            render.push(<div>CON <input defaultValue={this.calculateAbilityScoreDisplay('con') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'con')}/></div>);
            render.push(<div>INT <input defaultValue={this.calculateAbilityScoreDisplay('int') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'int')}/></div>);
            render.push(<div>WIS <input defaultValue={this.calculateAbilityScoreDisplay('wis') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'wis')}/></div>);
            render.push(<div>CHA <input defaultValue={this.calculateAbilityScoreDisplay('cha') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'cha')}/></div>);
        }
        else if (this.props.abilityScoreDetermination.toLowerCase().includes('self')) {
            render.push(<div>STR <input defaultValue={this.calculateAbilityScoreDisplay('str') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'str')}/></div>);
            render.push(<div>DEX <input defaultValue={this.calculateAbilityScoreDisplay('dex') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'dex')}/></div>);
            render.push(<div>CON <input defaultValue={this.calculateAbilityScoreDisplay('con') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'con')}/></div>);
            render.push(<div>INT <input defaultValue={this.calculateAbilityScoreDisplay('int') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'int')}/></div>);
            render.push(<div>WIS <input defaultValue={this.calculateAbilityScoreDisplay('wis') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'wis')}/></div>);
            render.push(<div>CHA <input defaultValue={this.calculateAbilityScoreDisplay('cha') + ''}
                                        onInput={event => this.handleAbilityScoreUpdate(event, 'cha')}/></div>);
        }
        else {
            render.push(<div>STR <input defaultValue={this.calculateAbilityScoreDisplay('str') + ''}
                                        disabled={true}/></div>);
            render.push(<div>DEX <input defaultValue={this.calculateAbilityScoreDisplay('dex') + ''}
                                        disabled={true}/></div>);
            render.push(<div>CON <input defaultValue={this.calculateAbilityScoreDisplay('con') + ''}
                                        disabled={true}/></div>);
            render.push(<div>INT <input defaultValue={this.calculateAbilityScoreDisplay('int') + ''}
                                        disabled={true}/></div>);
            render.push(<div>WIS <input defaultValue={this.calculateAbilityScoreDisplay('wis') + ''}
                                        disabled={true}/></div>);
            render.push(<div>CHA <input defaultValue={this.calculateAbilityScoreDisplay('cha') + ''}
                                        disabled={true}/></div>);
        }
        return render;
    }


    //TODO: turn into drop downs if point uby?
    public render() {
        return (
            <div className="ability-scores">
                {
                    this.renderPointBuyTotalCost()
                }
                {
                    this.renderScores()
                }

            </div>
        );
    }
}

let AbilityScoresConnected = connect(mapStateToProps, mapDispatchToProps)(AbilityScores);
export default AbilityScoresConnected;
