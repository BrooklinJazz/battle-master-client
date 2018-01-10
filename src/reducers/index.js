import { combineReducers } from 'redux';
import MonsterReducer from './reducer_monsters'
// NOTE currenly selecting one monster, will switch to many
import ActiveMonster from './reducer_active_monster'

const rootReducer = combineReducers({
  monsters: MonsterReducer,
  activeMonster: ActiveMonster
});

export default rootReducer;
