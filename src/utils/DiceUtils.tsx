class DiceUtils {
    static rollDice(faces) {
        return Math.floor(Math.random() * faces) + 1
    }

    static rollAbilityScores4d6(): number {
        let rolls = [DiceUtils.rollDice(6), DiceUtils.rollDice(6), DiceUtils.rollDice(6), DiceUtils.rollDice(6),];
        let smallest = rolls[0];
        for (let i = 0; i < rolls.length; i++) {
            if (rolls[i] < smallest) {
                smallest = rolls[i];
            }
        }
        let smallestRemoved = false;
        let sum = 0;
        for (let i = 0; i < rolls.length; i++) {
            if (rolls[i] === smallest && !smallestRemoved) {
                smallestRemoved = true;
            } else {
                sum += rolls[i];
            }
        }
        return sum;
    }

    static rollAbilityScores3d6(): number {
        let rolls = [DiceUtils.rollDice(6), DiceUtils.rollDice(6), DiceUtils.rollDice(6)];
        for (let i = 0; i < rolls.length; i++) {
            let newRoll = DiceUtils.rollDice(6);
            if (rolls[i] === 1) {
                while (newRoll === 1) {
                    newRoll = DiceUtils.rollDice(6);
                }
                rolls[i] = newRoll;
            }
        }
        let sum = 0;
        for (let i = 0; i < rolls.length; i++) {
            sum += rolls[i];
        }
        return sum;
    }
}

export default DiceUtils