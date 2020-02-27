#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");

const axios = require ("axios");
const GitUrlParse = require("git-url-parse");
const simpleGit = require("simple-git")();
const Yaml = require("yaml");

// already ran encryption
const idempotenceMsg = `It appears that your token is already encrypted. To run this script again, delete the \`before_deploy\` and \`deploy\` keys from the .travis.yml file.`

const successMsg = `Completed. Run \`git diff .travis.yml\` to check.`

const cleanUp = () => {
    const externalFiles = [`.tmp.key.pem`, `.tmp.token.txt`, `txt.token.enc`];
    externalFiles.forEach(file => {
        if(fs.existsSync(file)) fs.unlinkSync(file);
    })
}

// get specific URL
const getRemoteUrl = (name, remotes) => {
    try {
        return remotes.filter(remote => remote.name === name)[0].refs.fetch;
    } catch (err) {
        console.log(`Warning: Remote ${name} does not exist.`, `Full error stacktrace: `, err);
    }
}

// return cmd stdout
const getStdOutFromCommand = async(cmd, args) => {
    const res = await new Promise((resolve, reject) => {
        const process = spawn(cmd, args);

        const stdout = [];
        const stderr = [];

        process.stdout.on("data", data => {
            stdout.push(data);
        })

        process.stderr.on("data", data => {
            stderr.push(data);
        })

        process.on("close", code => {
            if(code) throw new Error(reject(stderr));
            resolve(stdout);
        })
    })
    return res;
}

// get app identifiers from git remote URLs
const getGitNames = () =>
    new Promise((resolve, reject) =>
        simpleGit.getRemotes(true, (err, res) => {
            if(err) throw new Error(reject(err))
            resolve({
                branchName: GitUrlParse(getRemoteUrl("origin", res)).full_name,
                appName: GitUrlParse(getRemoteUrl("heroku", res)).name
            })
        }))

// openssl auth token encryption
const encryptHerokuToken = async() => {
    await getStdOutFromCommand("openssl", [
        "rsautl",
        "-encrypt",
        "-pubin",
        "-inkey",
        ".tmp.key.pem",
        "-in",
        ".tmp.token.txt",
        "-out",
        ".tmp.token.enc"
    ])
}

const updateTravisYaml = (app, key) => {
    const travis = fs.readFileSync(".travis.yml", "utf8");
    const doc = Yaml.parseDocument(travis);
    if(doc.has(`before_deploy`)) return console.log(idempotenceMsg);
    doc.set(`deploy`, Yaml.createNode({
        skip_cleanup: true,
        provider: "heroku",
        app: app,
        api_key: { secure: key }
    }))
    doc.contents.items.filter(item => item.key in keyComments).forEach(item => {
        item.comment = keyComments[item.key]
        if (item.key === 'deploy') {
          item.value.items.forEach(item_ => {
            item_.commentBefore = keyComments[item_.key]
          })
        }
      })
      doc.comment = ''
      fs.writeFileSync('.travis.yml', doc.toString())
      return true
}

const main = async() => {
    const verbose = process.argv.hasOwnProperty(2);
    const { branchName, appName } = await getGitNames();

    // fetch auth token from heroku cli
    const herokuTokenOut = await getStdOutFromCommand("heroku", ["auth:token"]);
    const herokuTokenStr = herokuTokenOut.toString("utf-8");
    const herokuToken = herokuTokenStr.slice(0, herokuTokenStr.length - 1);
    if(verbose) console.log(`Received Heroku token`, herokuToken.toString());

    // download repo public key supplied by travis
    const travisUrl = `https://api.travis-ci.org/repos/${branchName}/key`;
    const travisResponse = await axios.get(travisUrl);
    const key = travisResponse.data.key;
    const keyBuffer = Buffer.from(key, "utf-8");
    if(verbose) console.log(`Received Travis pubkey:\n`, keyBuffer.toString());

    fs.writeFileSync(`.tmp.key.pem`, key);
    fs.writeFileSync(`.tmp.token.txt`, herokuToken);

    // heroku token encrypted and saved in tmp.token.enc file
    await encryptHerokuToken();

    // encode encrypted data in base 64
    const keyBase64 = fs.readFileSync(`.tmp.token.enc`).toString(`base64`);

    cleanUp();

    const update = updateTravisYaml(appName, keyBase64);
    if(update) console.log(successMsg);

    process.on(`uncaughtException`), () => {
        cleanUp();
        try {
            if(verbose) console.log("Cleaned up on error!");
            process.exit(1);
        } catch (err) {
            
        }

    proocess.on(`undHandleRejection`), () => {

    }
    }
}
