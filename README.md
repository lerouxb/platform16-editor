# Synth Editor

A React/TypeScript web app for designing hardware synthesizer front panels. It renders an SVG-based panel layout with knobs, buttons, labels, connections between controls, and mounting holes — then lets you export the design for printing or cutting (e.g. with a Cricut).

## Features

- **SVG panel rendering** — knobs, buttons, labels, connection lines, images, and mounting holes are all drawn to scale in millimetres
- **Three display modes**
  - **Preview** — visual preview with colours and fills
  - **Print** — artwork-only output suitable for printing onto a panel overlay
  - **Cut** — outlines-only output for cutting machines
- **Knob editor** — click any knob to edit its label and colour
- **Global controls** — toggle visibility of holes, washers, knobs, and mounting holes; choose between 6 mm and 9 mm hole sizes
- **Persistent state** — panel state is saved to `localStorage` so changes survive page reloads

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Create React App](https://create-react-app.dev/) (build tooling)
- [Emotion CSS](https://emotion.sh/) (styling)
- State managed via React Context + `useReducer`

## Getting Started

```bash
npm install
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server |
| `npm test` | Run tests in watch mode |
| `npm run build` | Create a production build |

## Project Structure

```
src/
  components/   — UI components (synth panel, knob, button, label, etc.)
  state/        — React context provider and reducer for panel state
  utils/        — Sizing/scaling helpers
public/         — Static assets (HTML shell, SVG icons)
```

## Default Panel

The app ships with a default "Euclidian Polymeters" synth module layout: 16 colour-coded knobs arranged in a grid, two buttons, and connection lines grouping related controls. This serves as a starting point that can be customised through the UI.
