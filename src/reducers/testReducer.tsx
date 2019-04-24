let initialState = {
    testValue: 'value'
};

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case 'banana':
            return {...state};
        default:
            return state;
    }
}