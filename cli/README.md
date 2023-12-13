# Screenshooter CLI

Screenshooter is a command-line tool that uses Puppeteer to take screenshots of websites. It's a simple yet powerful tool for capturing web pages as images.

## Features

- Take full-page screenshots of websites.
- Fixes sticky footers and overflows.
- Automatic filename generation based on URL and timestamp.
- Colorful console output for better user experience.

## Installation

Clone this repository and navigate to the project directory.

Install the dependencies:

```
npm install
```

To take a screenshot of a website, run:
Replace <url> with the actual website URL.

```
./shoot.js <url>
```

or

```
node shoot.js <url>
```

or

```
nprm run shoot <url>
```

Link the package globally to use it from anywhere (optional):

```
npm link
shoot <url>
```

Output
Screenshots are saved in the current directory with a filename based on the URL and the current timestamp.

Contributing
Contributions to Screenshooter are welcome. Please feel free to report any issues or submit pull requests.
