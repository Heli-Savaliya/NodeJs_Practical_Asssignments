const http = require('http');
const axios = require('axios');
const cheerio = require('cheerio');
const WebSocket = require('ws');

const CRICKET_URL = 'https://www.example-cricket-website.com/live-scores'; // Replace with the actual cricket website URL

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(getHtml());
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Listen on port 8080
server.listen(8080, () => {
  console.log('Server is running on port 8080');
});

// WebSocket server
const wss = new WebSocket.Server({ server });

async function fetchLiveScores() {
  try {
    const response = await axios.get(CRICKET_URL);
    const html = response.data;
    const $ = cheerio.load(html);

    const liveScores = [];

    // Replace the following with the appropriate selectors to extract the live scores from the website
    $('div.live-score').each((index, element) => {
      const match = $(element).text();
      liveScores.push(match);
    });

    return liveScores;
  } catch (error) {
    console.error('Error fetching live scores:', error.message);
    return [];
  }
}

wss.on('connection', async (ws) => {
  console.log('Client connected');

  const sendLiveScores = async () => {
    try {
      const liveScores = await fetchLiveScores();
      ws.send(JSON.stringify(liveScores));
    } catch (error) {
      console.error('Error sending live scores:', error.message);
    }
  };

  // Send live scores initially when the client connects
  sendLiveScores();

  // Schedule regular updates every 10 seconds
  const intervalId = setInterval(sendLiveScores, 10000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

// HTML template for the client
function getHtml() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Live Cricket Scores</title>
    </head>
    <body>
      <h1>Live Cricket Scores</h1>
      <ul id="scores"></ul>

      <script>
        const scoresList = document.getElementById('scores');
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
          const liveScores = JSON.parse(event.data);
          scoresList.innerHTML = '';

          liveScores.forEach((match) => {
            const listItem = document.createElement('li');
            listItem.textContent = match;
            scoresList.appendChild(listItem);
          });
        };

        ws.onclose = () => {
          scoresList.innerHTML = '<p>Connection to live scores server closed.</p>';
        };
      </script>
    </body>
    </html>
  `;
}
