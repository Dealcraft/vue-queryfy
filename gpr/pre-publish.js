import fs from "fs";

const file = fs.readFileSync("./package.json", {
	encoding: "utf-8",
});

const json = JSON.parse(file);

json.name = "@dealcraft/" + json.name;

fs.writeFileSync("./package.json", JSON.stringify(json, undefined, 2));
