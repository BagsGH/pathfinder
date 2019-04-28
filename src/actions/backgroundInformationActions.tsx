export const setCharacterName = (name) => ({
    type: 'SET_CHARACTER_NAME',
    payload: name
});

export const setAlignment = (alignment) => ({
    type: 'SET_ALIGNMENT',
    payload: alignment
});

export const setRace = (race) => ({
    type: 'SET_RACE',
    payload: race
});


export const setLevelsClass = (level, pfClass) => ({
    type: 'SET_LEVELS_CLASS',
    payload: {
        level: level,
        pfClass: pfClass
    }
});