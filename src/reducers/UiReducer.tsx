let initialState = {
    creationSettingsModalVisible: false
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CREATION_SETTINGS_MODAL_VISIBLE':
            return {
                ...state,
                creationSettingsModalVisible: action.payload
            };
        default:
            return state;
    }
}