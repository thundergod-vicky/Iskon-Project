# ISKCON Futuristic Website

A modern, dynamic website for the International Society for Krishna Consciousness (ISKCON) built with Next.js, TypeScript, TailwindCSS, and Framer Motion.

## Features

- 🌟 Modern UI/UX with sleek animations
- 🎨 Custom ISKCON-themed design system
- 📱 Fully responsive for all devices
- ⚡ Fast page loading and transitions
- 🧩 Component-based architecture
- 🌐 SEO optimized structure

## Tech Stack

- **Next.js**: React framework with SSR/SSG capabilities
- **TypeScript**: Type-safe code
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Icons**: Icon library

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd iskcon-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

```
iskcon-website/
├── public/            # Static assets
│   └── images/        # Website images
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── about/     # About page
│   │   ├── events/    # Events page
│   │   └── ...        # Other pages
│   ├── components/    # Reusable components
│   ├── styles/        # Global styles and CSS modules
│   ├── utils/         # Utility functions
│   └── assets/        # Other assets like fonts, etc.
├── package.json       # Project dependencies and scripts
└── tailwind.config.js # TailwindCSS configuration
```

## Adding Content

To add or modify content:

1. Page content can be edited in the corresponding page files within `src/app/`.
2. Assets like images should be placed in the `public/images/` directory.
3. Components can be added or modified in the `src/components/` directory.

## Customization

### Colors and Theme

The ISKCON theme colors and styling variables are defined in `tailwind.config.js`. You can modify these to change the overall look and feel of the website.

### Fonts

The website uses Google Fonts (Inter and Poppins). You can change these in the `src/app/layout.tsx` file.

## Deployment

This website can be deployed on Vercel, Netlify, or any hosting service that supports Next.js applications.

For a static export:

```bash
npm run build
npm run export
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- ISKCON for their spiritual teachings and inspiration
- Next.js team for the amazing framework
- TailwindCSS team for the utility-first approach to styling 