# Red Tetris

A Full Stack JavaScript Tetris game using React, Redux, Node.js, and Socket.io.

This project provides:

* Modern ES6+ JavaScript with Babel transpilation
* Client-side React/Redux for UI and state management
* Server-side Node.js with Socket.io for real-time communication
* Docker infrastructure for consistent development and deployment
* Comprehensive test infrastructure for both client and server components

## Project Structure

The project is organized into two main directories:

```
red_tetris/
├── client/                 # Client-side code
│   ├── src/                # React/Redux application
│   ├── test/               # Client-specific tests
│   ├── Dockerfile          # Client Docker configuration
│   └── package.json        # Client dependencies
│
├── server/                 # Server-side code
│   ├── src/                # Node.js/Socket.io server
│   ├── test/               # Server-specific tests
│   ├── Dockerfile          # Server Docker configuration
│   ├── webpack.config.js   # Webpack configuration
│   ├── index.html          # Main HTML file
│   └── package.json        # Server dependencies
│
├── docker-compose.yml      # Docker Compose configuration
└── Makefile                # Commands for building and running
```

## Prerequisites

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Using Docker (Recommended)

Build and start the containers:

```bash
make build   # Build Docker images
make up      # Start containers in detached mode
```

Or to rebuild and start in one command:

```bash
make rebuild
```

You can also run only the server or client:

```bash
make server-up
make client-up
```

Access the application:
- Client: http://localhost:8080
- Server: http://localhost:3004

### Running Tests

```bash
make server-test   # Run server tests
make client-test   # Run client tests
make test-all      # Run all tests
```

### Stopping the Application

```bash
make down    # Stop containers
make clean   # Stop containers and remove volumes, images
```

## Development Workflow

The application uses hot reloading for development:

1. Client-side changes (React/Redux) will automatically reload in the browser
2. Server-side changes will automatically restart the server

The Docker setup mounts your source directories, so changes to the code are immediately reflected.

### Socket.io Communication

The client and server communicate through Socket.io:

- Client dispatches Redux actions prefixed with `server/` to send events to the server
- Server emits events that are captured by the client middleware and dispatched as Redux actions
- Game state is synchronized in real-time

## Project Components

### Client

- **React** for UI components
- **Redux** for state management
- **Socket.io-client** for real-time communication
- **Immutable.js** for immutable data structures
- **Lodash and Ramda** for functional programming utilities

### Server

- **Node.js** for the server runtime
- **Socket.io** for WebSocket communication
- **Babel** for ES6+ support

## Commands Reference

The `Makefile` provides several commands for managing the application:

| Command | Description |
|---------|-------------|
| `make build` | Build Docker images |
| `make up` | Start containers in detached mode |
| `make rebuild` | Rebuild and start containers |
| `make down` | Stop containers |
| `make logs` | Show logs from all containers |
| `make server-logs` | Show server logs |
| `make client-logs` | Show client logs |
| `make clean` | Remove containers, images, and volumes |
| `make server-test` | Run server tests |
| `make client-test` | Run client tests |
| `make test-all` | Run all tests |
| `make install` | Install dependencies |
| `make help` | Show available commands |