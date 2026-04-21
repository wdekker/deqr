# DeQR Context

**DeQR** is a simple, no-nonsense, privacy-first, ad-free, open-source, and login-free web app for generating QR codes. It runs completely inside the browser using React and Vite.

## Architecture
- **Framework**: React 18, built with Vite 5.
- **Styling**: Vanilla CSS (`src/index.css`) emphasizing Glassmorphism and a dark mode aesthetic.
- **Core Library**: `qrcode.react` to generate HTML canvases dynamically as the user types.
- **Testing**: `Vitest`, `@testing-library/react`, and `happy-dom`.
- **Analytics**: GoatCounter via `deqr.dekker.dev` tracking script inside `index.html` and custom debounced `generate-qr`/`download-qr` events in `App.jsx`.

## Key Features
- Hard input limit of 2000 characters to prevent processing overload.
- Native `.png` download feature extracting directly from the generated canvas element.
- Fully local execution; no payloads sent to a server.
- Dynamic color styling (advanced options toggle).
