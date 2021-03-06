import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std@0.123.0/io/buffer.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/lodash.js";

interface Planet {
    [ key: string ] : string
}

async function loadPlanetsData() {
    const path = join(".", "kepler_exoplanets_nasa.csv");
    const file = await Deno.open(path);
    // create a new BufReader
    const bufReader = new BufReader(file);
    const result = await parse(bufReader, {
        skipFirstRow: true,
        comment: "#",// how to identify the comments
      });
    Deno.close(file.rid);
    const planets = (result as Array<Planet>).filter((planet) => {
        const planetaryRadius = Number(planet["koi_prad"]);
        const stellarMass = Number(planet["koi_smass"]);
        const stellarRadius = Number(planet["koi_srad"]);
        return planet["koi_disposition"] === "CONFIRMED"
            && planetaryRadius > 0.5 && planetaryRadius < 1.5
            && stellarMass > 0.78 && stellarMass < 1.04
            && stellarRadius > 0.99 && stellarRadius < 1.01;
    })
    return planets.map((planet) => {
        return _.pick(planet, [
            "koi_prad",
            "koi_smass",
            "koi_srad",
            "kepler_name",
            "koi_count",
            "koi_steff",
            "koi_period"
        ]);
    });
}

const newEarths = await loadPlanetsData();
// log infos about habitable planets
for (const planet of newEarths) {
    console.log(planet);
}
console.log(`${newEarths.length} habitable planets found!`);

// find the planets with less data period
const [ minPeriod, maxPeriod ] = newEarths.reduce((acc, planet) => {
    const minValue = Number(planet["koi_period"]) < acc[0] ? Number(planet["koi_period"]) : acc[0];
    const maxValue = Number(planet["koi_period"]) > acc[1] ? Number(planet["koi_period"]) : acc[1];
    return [minValue, maxValue];
}, [Number(newEarths[0]["koi_period"]), Number(newEarths[0]["koi_period"])]);

console.log(`${minPeriod} days was the shortest orbital period found!`);
console.log(`${maxPeriod} days was the longest orbital period found!`);
// run with
// deno run --allow-read mod.ts