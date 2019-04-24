import React from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";
import store from "./store/store";
import {testAction} from "./actions/testActions";


const mapStateToProps = state => {
    return {
        testValue: state.test.testValue
    };
};

type AppProps = {
    testValue: string
}

export class App extends React.Component<AppProps, {}> {
    public render () {
        console.log(this.props.testValue);
        store.dispatch(testAction());
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                        Howdy, live reload here we go!
                        {this.props.testValue}
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}
export default connect(mapStateToProps) (App)
