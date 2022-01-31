function readFile() {
    const data = await Deno.readTextFile("heeello.txt");
    console.log(data);
}

readFile();