let initialState = {
    levels: [{level: 1, pfClass: ''}]
};

export default function levelsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LEVELS':
            let newLevel = parseInt(action.payload);
            if (invalidNewLevel(newLevel)) {
                return state;
            }
            if (addingNewLevels(newLevel, state.levels.length)) {
                let newLevels = state.levels.slice();
                for (let i = state.levels.length + 1; i <= newLevel; i++) {
                    newLevels.push({level: i, pfClass: ''});
                }
                return {
                    ...state,
                    levels: newLevels
                }
            }
            return {
                ...state,
                levels: state.levels.slice(0, newLevel)
            };
        case 'SET_LEVELS_CLASS':
            return {
                ...state,
                levels: state.levels.map(level => {
                    if (level.level === action.payload.level) {
                        return {level: level.level, pfClass: action.payload.pfClass};
                    }
                    return level;
                })
            };
        default:
            return state;
    }
}

function invalidNewLevel(newLevel) {
    return !newLevel || newLevel < 1;
}

function addingNewLevels(newLevel, oldLevel) {
    return newLevel > oldLevel;
}