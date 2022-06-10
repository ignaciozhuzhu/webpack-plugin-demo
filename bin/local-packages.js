#!/usr/bin/env node
const util = require("util");
//const writeFile = require('node:fs');
const fs = require("fs");
const path = require("node:path");
const exec = util.promisify(require("child_process").exec);

const COMMANDS = {
  findPackageJsons: `find "$(pwd)" -name "package.json"`,
};

const PACKAGE_JSON_MAPPING = {};

KEYS = ["dependencies", "devDependencies", "peerDependencies", "resolutions"];

async function findPackageJsonPaths() {
  const { stdout, stderr } = await exec(COMMANDS.findPackageJsons);
  return stdout.split("\n").filter(Boolean);
}

function getPkgName(path) {
  try {
    const json = fs.readFileSync(path);
    const parsed = JSON.parse(json);
    return parsed.name;
  } catch (e) {
    console.error(`Error opening ${path}`);
  }
}

async function generateMapping() {
  const paths = await findPackageJsonPaths();
  //console.log(3,paths)
  paths.forEach((path) => {
    const name = getPkgName(path);
    if (
      (name && name.startsWith("@xcfed") && !name.includes("%")) ||
      name === "my-app"
    ) {
      //	    console.log(55,name)

      //  if (name && !name.includes('%')) {
      PACKAGE_JSON_MAPPING[name] = path;
    }
  });

  /*  const data = new Uint8Array(Buffer.from(JSON.stringify(PACKAGE_JSON_MAPPING, null, 2)));
  fs.writeFile('aa.txt', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });*/
}

function mapPackageNameToPackageDir(packageName) {
  const packageJsonPath = PACKAGE_JSON_MAPPING[packageName];

  if (!packageJsonPath) {
    return;
  }

  const packageDir = path.dirname(packageJsonPath);
  return packageDir;
}

async function main() {
  await generateMapping();

  const packageJsonPath = "package.json"; // process.argv.pop();
  const packageJsonContent = fs.readFileSync(packageJsonPath);
  const parsed = JSON.parse(packageJsonContent);
  // console.log(11111,parsed)
  KEYS.forEach((key) => {
    if (parsed[key]) {
      //  Object.keys(parsed[key]).forEach((dependencyKey) => {
      Object.keys(PACKAGE_JSON_MAPPING).forEach((dependencyKey) => {
        const pkgDir = mapPackageNameToPackageDir(dependencyKey);
        const pkgDir2 = pkgDir + "/package.json";
        if (pkgDir) {
          const packageJsonContent1 = fs.readFileSync(pkgDir2);
          const parsed2 = JSON.parse(packageJsonContent1);

          KEYS.forEach((key) => {
            if (parsed2[key]) {
              Object.keys(parsed2[key]).forEach((dependencyKey) => {
                const pkgDir = mapPackageNameToPackageDir(dependencyKey);
                if (pkgDir) {
                  parsed2[key][dependencyKey] = `file:${path.relative(
                    path.dirname(pkgDir2),
                    pkgDir
                  )}`;
                }
              });
            }
          });
          //console.log(22,parsed2,pkgDir2,PACKAGE_JSON_MAPPING)
          const data = new Uint8Array(
            Buffer.from(JSON.stringify(parsed2, null, 2))
          );
          fs.writeFile(pkgDir2, data, (err) => {
            if (err) throw err;
            console.log(`The file ${pkgDir2} has been changed! You may should be reinstall packages`);
          });
        }
      });
    }
  });
  //console.log(4,Object.keys(PACKAGE_JSON_MAPPING).length)
  //  console.log(5,PACKAGE_JSON_MAPPING)
  // process.stdout.write(JSON.stringify(parsed2, null, 2))
}

//main();

module.exports = main;
