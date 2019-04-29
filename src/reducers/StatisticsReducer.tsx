let initialState = {
    abilityScores: [
        {name: 'str', value: 10},
        {name: 'dex', value: 10},
        {name: 'con', value: 10},
        {name: 'int', value: 10},
        {name: 'wis', value: 10},
        {name: 'cha', value: 10},
    ]
};

export default function statisticsReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ABILITY_SCORE":
            return {
                ...state,
                abilityScores: state.abilityScores.map(abilityScore => {
                    if (abilityScore.name === action.payload.abilityScore) {
                        return {name: abilityScore.name, value: action.payload.value};
                    }
                    return abilityScore;
                })
            };
        default:
            return state;
    }
}