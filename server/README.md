# Screenshooter Server

This project is an Express server that provides an API to take screenshots of web pages. It uses Puppeteer for rendering and capturing the screenshots.

## Features

- Take screenshots of web pages via a simple API.
- Manual and scheduled cleanup of old screenshots.

## API Endpoints

GET /shoot: Takes a screenshot of a given URL and returns the image.
GET /cleanup: Manually triggers the cleanup of screenshots.

## Installation

Clone this repository and navigate to the project directory.

Install the dependencies:

```
npm install
```

Start server:

```
npm run start
```

Start development server:

```
npm run dev
```

## Usage

To take a screenshot, send a GET request to /shoot with the url query parameter:

```
http://localhost:3000/shoot?url=https://example.com
```

This will return a JSON object with the screenshot URL.

To manually trigger the cleanup of screenshots, send a GET request to /cleanup.

### Contributing

Contributions to Screenshooter are welcome. Please feel free to report any issues or submit pull requests.
