import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {connect} from "react-redux";
import store from "./store/store";
import {testAction} from "./actions/testActions";
import Magus from "./classes/magus";

import * as _map from 'lodash/map';

import magus from "./resources/json/classes/magus.json";
import data from "./resources/json/classes/raw_magus.json";
import CreationPageConnected from "./components/creationPage/CreationPage";


const mapStateToProps = state => {
    return {
        testValue: state.test.testValue
    };
};

type AppProps = {
    testValue: string
}

function r(faces: number): void {
    let magi = new Magus();
    console.log(magi.bab.get(8));
    console.log(magus);
    console.log(data);

    let allSaves = [];
    let allBab = [];
    let testMap = new Map();

    for (let i = 0; i < data.length; i++) {
        let level = data[i].Level.substring(0, data[i].Level.length - 2);
        let stringArrayBab: string[] = data[i].BAB.replace(/\+/g, '').replace(/\//g, ',').split(',');
        let babArray = stringArrayBab.map(x => parseInt(x));
        console.log(level);
        console.log(babArray);
        let fortSave = parseInt(data[i].fortSave.replace(/\+/g, ''));
        let refSave = parseInt(data[i].refSave.replace(/\+/g, ''));
        let willSave = parseInt(data[i].willSave.replace(/\+/g, ''));
        let saves: number[] = [fortSave, refSave, willSave];
        console.log(saves);
        allSaves.push(saves);
        allBab.push(babArray);

        testMap.set(level + "", saves);

    }

    console.log(JSON.stringify({bab: allBab, saves: allSaves}));

    // return Math.floor(Math.random() * (faces - 1)) + 1;

    let dexMod = 4;
    let strModHigh = 4;
    let strModLow = 2;
    let bab = 1;

    let target = {
        ac: 20,
        touch: 12
    };

    let musketRR = {
        name: 'musketRapidReload',
        dice: 1,
        sides: 10,
        critical: 4,
        criticalRange: 20,
        broken: false,
        needReload: false,
        misfireRange: 2,
        damageBonus: 0,
        hit: dexMod+ bab,
        target: 'touch',
        bonus: 0
    };
    let musketSpellCart = {
        name: 'musketSpellCart',
        dice: 2,
        sides: 4,
        critical: 4,
        criticalRange: 20,
        broken: false,
        needReload: false,
        misfireRange: 2,
        damageBonus: 0,
        hit: dexMod +bab,
        target: 'touch',
        bonus: 2
    };
    let musket = {
        name: 'musket',
        dice: 1,
        sides: 10,
        critical: 4,
        criticalRange: 20,
        broken: false,
        needReload: true,
        misfireRange: 2,
        damageBonus: 0,
        hit: dexMod+bab,
        target: 'touch',
        bonus: 0
    };

    let lightCrossBow = {
        name: 'lightCrossBow',
        dice: 1,
        sides: 6,
        critical: 2,
        criticalRange: 19,
        broken: false,
        needReload: false,
        misfireRange: -1,
        damageBonus: 0,
        hit: dexMod+bab,
        target: 'ac',
        bonus: 0
    };

    let heavyCrossBow = {
        name: 'heavyCrossBow',
        dice: 1,
        sides: 8,
        critical: 2,
        criticalRange: 19,
        broken: false,
        needReload: true,
        misfireRange: -1,
        damageBonus: 0,
        hit: dexMod+bab,
        target: 'ac',
        bonus: 0
    };

    let heavyCrossBowRR = {
        name: 'heavyCrossBowRR',
        dice: 1,
        sides: 8,
        critical: 2,
        criticalRange: 19,
        broken: false,
        needReload: false,
        misfireRange: -1,
        damageBonus: 0,
        hit: dexMod+bab,
        target: 'ac',
        bonus: 0
    };

    let bowHighStr = {
        name: 'bowHighStr',
        dice: 1,
        sides: 6,
        critical: 3,
        criticalRange: 19,
        broken: false,
        needReload: false,
        misfireRange: -1,
        damageBonus: 0,
        hit: dexMod+bab,
        target: 'ac',
        bonus: strModHigh
    };

    let bowMedstr = {
        name: 'bowMedStr',
        dice: 1,
        sides: 6,
        critical: 3,
        criticalRange: 19,
        broken: false,
        needReload: false,
        misfireRange: -1,
        damageBonus: 0,
        hit: dexMod+bab,
        target: 'ac',
        bonus: strModLow
    };

    let bowHighStrLowDex = {
        name: 'bowHighStrLowDex',
        dice: 1,
        sides: 6,
        critical: 3,
        criticalRange: 19,
        broken: false,
        needReload: false,
        misfireRange: -1,
        damageBonus: 0,
        hit: 1 + bab,
        target: 'ac',
        bonus: strModHigh
    };

    let weapons = [musket, musketRR, musketSpellCart, bowHighStrLowDex, bowMedstr, bowHighStr];
    for (let k = 0; k < weapons.length; k++) {
        let weapon = weapons[k];
        let totalDamage = 0;
        let hitCount = 0;
        let critCount = 0;
        let misfireCount = 0;
        let fireCount = 0;
        for (let i = 0; i < 1000000; i++) {
            if (weapon.broken) {
                weapon.broken = false;
            } else if (weapon.needReload) {
                weapon.needReload = false;
            } else {
                let hitRoll = random(20);
                if (hitRoll <= weapon.misfireRange) {
                    weapon.broken = true;
                    misfireCount ++;
                } else {
                    let didHit = false;
                    fireCount ++;
                    if (weapon.name === 'musket' || weapon.name === 'heavyCrossBow') {
                        weapon.needReload = true;
                    }
                    let dice = weapon.dice;
                    if (hitRoll >= weapon.criticalRange) {
                        dice = weapon.critical * weapon.dice;
                        critCount++;
                    }
                    if (hitRoll + weapon.hit >= target.ac) {
                        didHit = true;
                    } else if (hitRoll + weapon.hit >= target.touch && weapon.target === 'touch') {
                        didHit = true;
                    }
                    if (didHit) {
                        hitCount++;
                        for (let j = 0; j < dice; j++) {
                            totalDamage += random(weapon.sides) + weapon.bonus;
                        }
                    }
                }
            }
        }

        console.log(weapon.name + ' expected damage:', totalDamage / 1000000);
        // console.log(weapon.name + ' average damage (when it hits):', totalDamage / hitCount);
        console.log(weapon.name + ' hit%:', hitCount / fireCount);
        // console.log(weapon.name + ' crit%:', critCount / 1000000);
        // console.log(weapon.name + ' misfire%:', misfireCount / fireCount);
    }
}

function random(faces) {
    return Math.floor(Math.random() * faces) + 1
}

export class App extends React.Component<AppProps, {}> {
    public render() {
        console.log(this.props.testValue);
        store.dispatch(testAction());
        console.log(r(6));
        return (
            <div className="App">
                <CreationPageConnected />

                {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<p>*/}
                    {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
                    {/*    Howdy, live reload here we go!*/}
                    {/*    {this.props.testValue}*/}
                    {/*</p>*/}
                    {/*<a*/}
                    {/*    className="App-link"*/}
                    {/*    href="https://reactjs.org"*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*>*/}
                    {/*    Learn React*/}
                    {/*</a>*/}
                {/*</header>*/}
            </div>
        );
    }
}

export default connect(mapStateToProps)(App)
