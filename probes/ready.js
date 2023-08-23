const net = require("net");
const { REACT_APP_API_BASE_URL, REACT_APP_WS_BASE_URL } = process.env;
if (!REACT_APP_API_BASE_URL) {
  throw "Missing 'REACT_APP_API_BASE_URL' env variable";
}
const apiRegex = new RegExp(/(https|http):\/\/([\S]*)/i);
const apiValues = apiRegex.exec(REACT_APP_API_BASE_URL);
apiValues.shift();
const [apiProtocol, apiHostAndPort] = apiValues;
let [apiHost, apiPort] = apiHostAndPort.split(":");
if (!apiPort) {
  if (apiProtocol === "http") {
    apiPort = "80";
  } else if (apiProtocol === "https") {
    apiPort = "443";
  }
}
const tcpApiClient = new net.Socket();

tcpApiClient.connect(+apiPort, apiHost, () => {
  if (!REACT_APP_WS_BASE_URL) {
    console.log("All fine!");
    tcpApiClient.destroy();
    process.exit(0);
  }
  const wsRegex = new RegExp(/(ws|wss):\/\/([\S]*)/i);

  const wsValues = wsRegex.exec(REACT_APP_WS_BASE_URL);
  wsValues.shift();
  const [wsProtocol, wsHostAndPort] = wsValues;
  let [wsHost, wsPort] = wsHostAndPort.split(":");
  if (!wsPort) {
    if (wsProtocol === "ws") {
      wsPort = "80";
    } else if (wsProtocol === "wss") {
      wsPort = "443";
    }
  }
  const tcpWsClient = new net.Socket();

  tcpWsClient.connect(+wsPort, wsHost, () => {
    console.log("All fine!");
    tcpWsClient.destroy();
    process.exit(0);
  });
});
