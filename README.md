# SketchUI

SketchUI is an AI-powered web application that transforms hand-drawn wireframes into clean, production-ready React components.

Draw your UI on an interactive canvas, click **Generate**, and instantly receive a React component built with modern best practices, complete with a live preview and copy-ready source code.

## ✨ Features

*  Interactive drawing canvas
*  AI-powered wireframe understanding
*  Production-ready React component generation
*  Tailwind CSS support
*  Shadcn UI components
*  Live preview inside the browser
*  One-click code copy
*  Fast client-side processing
*  API key protection through the backend

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Shadcn UI

### Backend

* Go
* REST API

### AI

* Vision-capable Large Language Model (LLM)

## Project Structure

```text
.
├── apps
│   ├── api      # Go backend
│   └── web      # Next.js frontend
├── docs
└── README.md
```

## How It Works

1. Draw a wireframe on the canvas.
2. Click **Generate**.
3. The drawing is sent to the AI model.
4. The AI returns a React component.
5. The application validates and prepares the output.
6. A live preview is rendered instantly.
7. Copy the generated code into your own project.

## Goals

* Make UI prototyping dramatically faster.
* Reduce repetitive frontend work.
* Generate readable, maintainable React code.
* Keep the user experience simple and intuitive.

## Development

### Start the frontend

```bash
cd apps/web
bun install
bun dev
```

### Start the backend

```bash
cd apps/api
go run ./cmd/main.go
```

## Status

 SketchUI is currently under active development.

Expect frequent updates, new features, and improvements.

## License

License information will be added before the first public release.
