import deities from "../resources/json/misc/deity.json";
import as from "../resources/json/misc/abilityScoreCosts.json";
import * as _map from "lodash/map";

class MiscDataLoader {

    private static mappedDeities = _map(deities.slice(), (deity, index) => {
        return {
            id: index + 1,
            text: deity.name
        }
    });

    public static deities() {
        return MiscDataLoader.mappedDeities;
    }

    public static abilityScoreCostMap() {
        let map = new Map();
        as.forEach(score => {
            map.set(score.score, score.cost);
        });
        return map;
    }

}

export default MiscDataLoader;