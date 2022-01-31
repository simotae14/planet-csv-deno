async function readDir(path: string) {
    for await (const dirEntry of Deno.readDir(path)) {
        console.log(dirEntry.name);
    }
}

await readDir(Deno.cwd());

// run with
// deno run --allow-read 01_exercise-read-dir.ts