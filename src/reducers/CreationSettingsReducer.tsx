import LevelingSpeed from "../enums/creationPage/LevelingSpeed";

let initialState = {
    levelingSpeed: LevelingSpeed.MEDIUM,
    fractionalBab: false,
    randomStartingHealth: false,
    randomLevelingHealth: false,
    randomStartingWealth: false,
    // abilityScoreDetermination: '3d6 - re-roll 1s'
    // abilityScoreDetermination: '4d6 - drop smallest'
    abilityScoreDetermination: '3d6 - assign'
    // abilityScoreDetermination: '4d6 - assign'
    // abilityScoreDetermination: 'Self-Enter'
    // abilityScoreDetermination: 'Point buy: 10'
    // abilityScoreDetermination: 'Point buy: 15'
    // abilityScoreDetermination: 'Point buy: 20'
    // abilityScoreDetermination: 'Point buy: 25'
};

export default function creationSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LEVELING_SPEED':
            return {
                ...state,
                levelingSpeed: action.payload
            };
        case 'SET_FRACTIONAL_BAB':
            return {
                ...state,
                fractionalBab: action.payload
            };
        case 'SET_RANDOM_STARTING_HEALTH':
            return {
                ...state,
                randomStartingHealth: action.payload
            };
        case 'SET_RANDOM_LEVELING_HEALTH':
            return {
                ...state,
                randomLevelingHealth: action.payload
            };
        case 'SET_RANDOM_STARTING_WEALTH':
            return {
                ...state,
                randomStartingWealth: action.payload
            };
        default:
            return state;
    }
}