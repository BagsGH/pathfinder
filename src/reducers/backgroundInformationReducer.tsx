let initialState = {
    characterName: '',
    alignment: '',
    alignments: ['Lawful Good',
        'Neutral Good', 'Chaotic Good',
        'Lawful Neutral', 'Neutral', 'Chaotic Neutral',
        'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'],
    race: '',
    races: [
        {id: 1, text: 'Human'},
        {id: 2, text: 'Orc'},
        {id: 3, text: 'Elf'},
        {id: 4, text: 'Half-Orc'},
        {id: 5, text: 'Half-Elf'},
    ]
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
        default:
            return state;
    }
}