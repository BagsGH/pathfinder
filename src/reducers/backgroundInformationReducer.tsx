let initialState = {
    characterName: '',
    alignment: '',
    race: '',
    races: [
        {id: 1, text: 'Human'},
        {id: 2, text: 'Orc'},
        {id: 3, text: 'Elf'},
        {id: 4, text: 'Half-Orc'},
        {id: 5, text: 'Half-Elf'},
    ],
    deity: '',
    gender: '',
    weight: '',
    height: '',
    levels: [{level: 1, pfClass: ''}]
};

export default function backgroundInformationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CHARACTER_NAME':
            return {
                ...state,
                characterName: action.payload
            };
        case 'SET_ALIGNMENT':
            return {
                ...state,
                alignment: action.payload
            };
        case 'SET_RACE':
            return {
                ...state,
                race: action.payload
            };
        case 'SET_DEITY':
            return {
                ...state,
                deity: action.payload
            };
        case 'SET_GENDER':
            return {
                ...state,
                gender: action.payload
            };
        case 'SET_WEIGHT':
            return {
                ...state,
                weight: action.payload
            };
        case 'SET_HEIGHT':
            return {
                ...state,
                height: action.payload
            };
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
            let levels = state.levels.slice();
            let levelToChange = action.payload.level;
            let pfClass = action.payload.pfClass;
            levels[levelToChange-1].pfClass = pfClass;
            return {
                ... state,
                levels: levels
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