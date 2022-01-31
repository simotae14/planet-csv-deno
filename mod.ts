import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std@0.123.0/io/buffer.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

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
    console.log("result", result);
}

await loadPlanetsData();

// run with
// deno run --allow-read mod.ts