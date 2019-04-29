export const setAbilityScore = (name, value) => ({
   type: "SET_ABILITY_SCORE",
   payload: {
      abilityScore: name,
      value: parseInt(value)
   }
});