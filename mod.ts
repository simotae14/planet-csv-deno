import { join } from "https://deno.land/std/path/mod.ts";

async function readFile() {
    const path = join("text_files", "heeello.txt");
    const data = await Deno.readTextFile(path);
    console.log(data);
}

await readFile();

// run with
// deno run --allow-read mod.ts