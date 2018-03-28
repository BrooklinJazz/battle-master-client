import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index"
import FontAwesome from 'react-fontawesome'
import ClickOutHandler from 'react-onclickout'

import Combatant from './Combatant';

class CombatantGroup extends Component {
    state = {}

    componentWillMount() {
        console.log(this.props);
    }

    renderList() {
        const { Combatants } = this.props.parentObj
        let returnArray = []
        for (let i = 0; i < Combatants.length; i++) {
            const element = Combatant[i]
            returnArray.push(<Combatant key={i} combatant={element} index={i} />)
        }
        return returnArray
        return <Combatant key={1} combatant={Combatants[0]} index={1} />
        return Combatants.map((combatant, index) => {
            return <Combatant key={index} combatant={combatant} index={index} />
        })
    }
    
    render() {
        const { Combatants } = this.props.parentObj
        return (
            <tbody>
           { Combatants.map((combatant, index) => (
                <Combatant key={index} combatant={combatant} index={index} />
            ))}
            </tbody>
        )
    }
}

export default CombatantGroup;