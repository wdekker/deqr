# DeQR

A beautiful, mobile-first, zero-backend QR code generator built with Vite, React, and Vanilla CSS. 
Features native download capability, deep custom color support, glassmorphism UI, and it runs 100% in the browser.

## Features
- **Frontend Only:** Fully local. No server calls when generating or downloading.
- **Dynamic Previews:** Generates exactly as you type.
- **Customizable:** Complete foreground and background color control.
- **Sleek Aesthetics:** Dark-mode default, animated glass UI.

## Security & Privacy Guarantees
- **No Exfiltration**: A strict Content Security Policy (CSP) actively prevents the browser from making unauthorized outbound network requests.
- **Supply Chain Security**: Automated `yarn npm audit` checks in the CI/CD pipeline block deployments if any production dependency has a known CVE vulnerability.

## Local Development

```bash
# Install dependencies
yarn install

# Start the dev server
yarn dev

# Run Vitest test suite
yarn test
```

## Tech Stack
- Frontend: `React 18` + `Vite`
- Rendering: `qrcode.react`
- Testing: `Vitest` + `React Testing Library`
- Styling: Plain CSS
