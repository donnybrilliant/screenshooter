# Screenshooter Monorepo

This monorepo contains three projects related to web page screenshots: Screenshooter Server, Screenshooter CLI, and Screenshooter Frontend. Each project serves a unique purpose and can be used independently or together for a complete web screenshot solution.

## Screenshooter Server

Screenshooter Server is an Express server that provides a simple API for taking screenshots of web pages using Puppeteer. It offers features like manual and scheduled cleanup of old screenshots.

## Screenshooter CLI

Screenshooter CLI is a command-line tool that uses Puppeteer to capture full-page screenshots of websites. It includes features for fixing sticky footers, handling overflows, and generating filenames based on URL and timestamp.

## Screenshooter Frontend

Screenshooter Frontend is a React application that provides a user-friendly interface for capturing web page screenshots. Users can enter a URL, trigger screenshot capture, and download the generated images. It includes loading and error handling states.

## To-Do / Improvements

- Create a common project for shared components.
- Enhance URL validation for more robust checking.
- Implement consistent error handling on both the frontend and backend.
- Enhance user feedback and loading indicators.
- Add unit and integration tests to ensure reliability.
- Optimize the screenshot capture process for performance.
- Implement a caching mechanism for frequently captured pages.
- Add a user-friendly dashboard for managing captured screenshots.
- Implement support for capturing multiple screenshots in a single request.
- Enhance security by sanitizing user-provided URLs.
- Implement custom error messages and status codes in the API.
- Support more image formats for captured screenshots (e.g., PNG, JPEG).
- Implement rate limiting to prevent abuse of the API.
- Enable logging and monitoring to track server performance and issues.

These improvements will make the Screenshooter Monorepo more robust, user-friendly, and reliable. Contributions and enhancements are welcome.
