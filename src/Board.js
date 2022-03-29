import React, { useState } from 'react';
import './index.css';
import { initialize, transition, State } from './Land.js';

class Cell extends React.Component {
    render() {
        let color
        switch (this.props.value.state) {
            case State.HEALTHY:
                color = "green"
                break
            case State.SICK:
                color = "red"
                break
            default:
                color = "white"
                break
        }
        return (
            <p className="cell" style={{ "backgroundColor": color }}>
                {/* TODO */}
            </p>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            land: initialize(),
            time: 0,
            reset: true
        }
    }

    start = (length) => {
        this.setState((prevState, pros) => ({
            land: initialize(length),
            time: 0,
            reset: false
        }))
    }

    renderCell = (cellState, i) => {
        return <Cell key={`cell${i}`} value={cellState} />;
    }

    width = () => {
        return this.state.land.length
    }

    row = (row) => {
        const arr = Array(this.width())
        for (let i = 0; i < this.width(); i++) {
            arr[i] = this.renderCell(this.state.land[row][i], i)
        }
        return arr
    }

    grid = () => {
        const arr = Array(this.width())
        for (let i = 0; i < this.width(); i++) {
            arr[i] = <div key={`row${i}`} className="board-row">{this.row(i)}</div>
        }
        console.log(arr)
        return [
            <div className="board">
            {arr}
            </div>,
            <button onClick={this.next}>Next Step</button>,
            <button onClick={this.startReset}>Reset</button>
        ]
    }

    next = () => {
        this.setState((prevState, props) => ({
            land: transition(prevState.land, prevState.time + 1),
            time: prevState.time + 1
        }))
    }

    startReset = () => {
        this.setState((prevState, props) => (
            { reset: true }
        ))
    }

    render() {
        return (
            <div>
                <h1> Virus Simulator </h1>
                {
                    this.state.reset
                        ? <StartForm onSubmit={this.start} length={this.state.land.length} />
                        : this.grid()
                }
            </div>
        );
    }
}

function StartForm(props) {

    // length, pInfection, recoveryTime, immuneTime
    const [length, setLength] = useState(10)
    const [pInfection, setPInfection] = useState(0.5)
    const [recoveryTime, setRecoveryTime] = useState(14)
    const [immuneTime, setImmuneTime] = useState(7)

    function handleSubmit(event) {
        props.onSubmit(parseInt(length))
        event.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="length">Side length: {length}</label> <br />
                <input id="length" type="range" min="3" max="100" value={length} onInput={event => setLength(event.target.value)} /><br />
                <label htmlFor="pInfection">Probability of infection from each neighbour: {pInfection}</label><br />
                <input id="pInfection" type="range" min="0.1" max="1" step="0.01" value={pInfection} onInput={event => setPInfection(event.target.value)} /><br />
                <label htmlFor="recoveryTime">Time it takes to recover from infection: {recoveryTime}</label><br />
                <input id="recoveryTime" type="range" min="0" max="100" value={recoveryTime} onInput={event => setRecoveryTime(event.target.value)} /><br />
                <label htmlFor="immuneTime">Time being immune from infection after recovery: {immuneTime}</label><br />
                <input id="immuneTime" type="range" min="0" max="100" value={immuneTime} onInput={event => setImmuneTime(event.target.value)} /><br />
                <input type="submit" value="Start" />
            </form>
        </div>
    )
}

export {Board};