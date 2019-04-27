export const setProperty = (type, value) => ({
   type: 'SET_' + type.toUpperCase(),
   payload: value
});