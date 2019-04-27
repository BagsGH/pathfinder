import deities from "./../resources/misc/deity.json";
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

}

export default MiscDataLoader;