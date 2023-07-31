import fetch from 'node-fetch';

async function fetchGoogle() {

    const result = await fetch('https://www.google.com/')
    console.log(result.body);
}
fetchGoogle();