let initialState = {
    characterName: ''
};

export default function backgroundInformationReducer(state = initialState, action) {
    switch (action.type) {
        case 'banana':
            return {...state};
        default:
            return state;
    }
}