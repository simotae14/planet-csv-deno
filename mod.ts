async function readFile() {
    const data = await Deno.readTextFile("heeello.txt");
    console.log(data);
}

await readFile();

// run with
// deno run --allow-read mod.ts