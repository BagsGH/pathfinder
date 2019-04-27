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
        default:
            return state;
    }
}