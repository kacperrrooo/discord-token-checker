const fetch = require('node-fetch');
const fs = require('fs');
const writeFiles = require('./writeFiles');
const getTokens = require('./getTokens');

const DOMAIN_URL = 'https://discord.com/api';
const API_VERSION = 'v10';
const ENDPOINT = '/users/@me';

writeFiles();

const tokens = getTokens();

let index = 0;

(async () => {

    for (const token of tokens) {

        index++;

        const res = await fetch(`${DOMAIN_URL}/${API_VERSION}${ENDPOINT}`, {

            headers: {

                'Content-Type': 'application/json',
                'Authorization': token

            },
            method: 'get'

        });

        if (!res.ok) {

            fs.appendFileSync('./invalid.txt', `${token}\n`);

            console.log(`[${index}/${tokens.length}] INVALID(${res.status}): ${token}`);

            continue;

        }

        const json = await res.json();

        fs.appendFileSync('./valid.txt', `${token}\n`);

        console.log(`[${index}/${tokens.length}] VALID(${json.username}#${json.discriminator} ${json.email}): ${token}`);

    }

})();