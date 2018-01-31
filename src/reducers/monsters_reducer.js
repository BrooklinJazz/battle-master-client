// state argument is not application state, only the state
// this reducer is responsible for tasks relating to monsters
import monstersData from "../data/monsters";
import Types from "../types";
import CombatantList from "../containers/CombatantList";
import {
  d20,
  deepClone,
  getNumberOfDice,
  getSidesOfDice,
  getModifier,
  rollSidedDice
} from "../../helpers"
// the array of monster objects exported as a function.
// NOTE storing monsters in a local file currently
const monsters = monstersData()

const INITIAL_STATE = {
  monsters,
  selectedMonster: null,
  CombatantList: [],
  searchTerm: '',
  rolls: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Select combatant to show detailed stats
    // coming from Combatant.js
    /****************************************
    MonsterList
    ****************************************/
    case Types.MONSTER_SELECTED:
    return { ...state, selectedMonster: action.combatant };
    // add a Monster obj to the CombatantList
    case Types.ADD_MONSTER_TO_COMBATANTS:
    const newCombatant = deepClone(action.monster);
    newCombatant.currentHp = newCombatant.HP.Value
    const newCombatantList = state.CombatantList.concat(
      newCombatant
    );
    return {
      ...state,
      CombatantList: newCombatantList
    };
    case Types.FILTER_MONSTER_LIBRARY:
    return {
      ...state,
      searchTerm: action.searchTerm
    };
    /****************************************
    CombatantList
    ****************************************/
    case Types.REMOVE_COMBATANT:
    // assign a constant to be equal to CombatantList.
    // using map to avoid mutating state.
    const combatantsListAfterRemove = state.CombatantList.map( (combatant, i) => {
      return combatant
    })
    // remove the combatant at the index given by the action
    combatantsListAfterRemove.splice(action.payload.index, 1)
    // return the CombatantList with the desired combatant removed
    return {
      ...state,
      CombatantList: combatantsListAfterRemove
    };
    case Types.CHANGE_MONSTER_HP:
    const combatantsListAfterChange = state.CombatantList.map( (combatant, i) => {
      if (i !== action.payload.index || isNaN(action.payload.hpChange) ) {
        // if the input given by hpChange is not a number
        // or the index of the current monster doesn't match
        // the expected index of payload: return the combatant as it is
        return combatant

        // if healing applied to monster brings it above max health
      } else if (action.payload.combatant.currentHp - action.payload.hpChange > action.payload.combatant.HP.Value) {
        // set currentHp to maxHp `action.payload.combatant.HP.Value`
        action.payload.combatant.currentHp = action.payload.combatant.HP.Value
        // return the combatant with max hp
        return action.payload.combatant

      } else if (action.payload.combatant.currentHp - action.payload.hpChange < 0) {
        action.payload.combatant.currentHp = 0
        return action.payload.combatant
      } else {
        // we are applying damage to the combatant so positive numbers reduce
        // the combatant's currentHp
        action.payload.combatant.currentHp -= action.payload.hpChange
        // return the combatant with changed HP
        return action.payload.combatant
      }
    })
    // console.log('reducer working', newCombatantsList);
    return {
      ...state,
      CombatantList: combatantsListAfterChange
    }
    /****************************************
    Rolls
    ****************************************/
    case Types.D20_ROLLED:
    const rolled = `d20 + ${action.payload}`
    const dtwenty = d20()
    const roll = `[${dtwenty}] + ${action.payload}`
    const result = action.payload + dtwenty
    console.log('d20', action)
    const newRoll = {rolled, roll, result}
    return {
      ...state,
      rolls: state.rolls.concat(newRoll)
    }
    case Types.DELETE_ROLL:
    console.log('DELETE_ROLL Action', action.payload);
    const rollsAfterDelete = state.rolls.map( (roll, i) => {
      return roll
    })
    rollsAfterDelete.splice(action.payload, 1)
    console.log('DELETE_ROLL rollsAfterDelete', rollsAfterDelete);
    console.log('DELETE_ROLL rollsAfterDelete', state.rolls);
    return {
      ...state,
      rolls: rollsAfterDelete
    }
    case Types.SIDED_DICE_ROLLED:
    // TODO convert rollArray toString() and add brackets.
    const toBeRolled = action.payload
    console.log('SIDED DICE ROLL ACTION', toBeRolled);
    const numberOfDice = getNumberOfDice(toBeRolled)
    const sidesOfDice = getSidesOfDice(toBeRolled)
    const modifier = getModifier(toBeRolled)
    const rollArray = rollSidedDice(numberOfDice, sidesOfDice)
    const rollArrayReduced = rollArray.reduce((a, b) => a + b, 0)
    const newSidedRoll = {rolled: action.payload, roll: rollArray, result: rollArrayReduced}
    console.log('newRoll', newSidedRoll);
    // NOTE there is an error with the look of rollArray being a single number
    return {
      ...state,
      rolls: state.rolls.concat(newSidedRoll)
    }

  }
  return state;
}

// const filterMonsters = ((monsters) => (searchTerm) => {
//   if (searchTerm) {
//     return monsters.filter((monster) => {
//       return monster.Name.includes(searchTerm)
//     })
//   }
//   return monsters
// })(monsters)
// immediate function

// add new case and type
// when the types, dispatch and action that is the correct action type with the payload
// and the current text
