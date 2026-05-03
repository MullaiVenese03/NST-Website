# Nebula Safe Tech (NST) - Website V2

[![Production Build](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/NebulaSafeTech/NST-Website-Version_2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg)](https://tailwindcss.com/)

## 🚀 Project Overview

**Nebula Safe Tech (NST)** is a next-generation SaaS landing page and professional service portal. Version 2 of the NST platform is engineered for high performance, featuring a modern architectural stack that bridges the gap between Cyber Security excellence and EdTech innovation.

### 🌟 Value Proposition
- **Enterprise-Grade Security**: Showcasing specialized services in Cloud, Network, and Application security.
- **Immersive UX/UI**: Utilizing Framer Motion and Tailwind CSS for a fluid, responsive, and accessible user experience.
- **Educational Empowerment**: A dedicated EdTech module designed for institutional partnerships and skill development.

---

## ✨ Key Features

- **Responsive Multi-Page Architecture**: Seamlessly navigate between Home, About, Services, Clients, and EdTech pages.
- **Dynamic Hero Section**: Interactive background elements with particle systems and video integration.
- **Service Portfolio**: Detailed service cards with custom icons for various security domains.
- **Trusted Clients Showcase**: A dynamic section highlighting academic and enterprise partnerships.
- **Modern Animations**: Complex parallax effects and scroll-triggered animations powered by `motion/react`.
- **Custom UI Library**: Built on top of Radix UI primitives for maximum accessibility and customization.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18.3.1 |
| **Build Tool** | Vite 6.x |
| **Styling** | Tailwind CSS 4.x, Emotion |
| **Animations** | Framer Motion (Motion 12), TW Animate CSS |
| **Routing** | React Router 7 |
| **UI Components** | Radix UI, Lucide Icons, Material UI Icons |
| **Charts** | Recharts |
| **Package Manager** | npm / pnpm |

---

## 📋 System Requirements

To ensure a smooth development and production experience, please verify that your environment meets the following specifications:

- **Runtime**: Node.js `v18.0.0` or higher (LTS recommended).
- **Package Manager**: npm `v9.0.0+` or pnpm `v8.0.0+`.
- **Memory**: Minimum 4GB RAM (8GB recommended for build processes).
- **Operating System**: Windows 10+, macOS 12+, or any modern Linux distribution.
- **Browser**: Modern evergreen browsers (Chrome 90+, Firefox 88+, Safari 14+).

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/NebulaSafeTech/NST-Website-Version_2.git
cd NST-Website-Version_2
```

### 2. Dependency Installation
The project uses `npm` by default, but is compatible with `pnpm`.
```bash
npm install
# OR
pnpm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (if needed for future API integrations):
```env
VITE_APP_TITLE=Nebula Safe Tech
# Add other variables here
```

### 4. Local Development
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Navigate to `http://localhost:5173` to view the application.

---

## 🚀 Launch & Deployment

### Production Build
Generate an optimized production-ready bundle:
```bash
npm run build
```
The output will be located in the `dist/` directory, containing minified assets and clean HTML.

### Deployment Procedures
1. **Vercel/Netlify**: Connect your GitHub repository for automatic CI/CD.
2. **Static Hosting**: Upload the contents of the `dist/` folder to any static host (AWS S3, Firebase Hosting, GitHub Pages).
3. **Docker (Optional)**:
   ```dockerfile
   # Example: Use Nginx to serve static content
   FROM nginx:alpine
   COPY ./dist /usr/share/nginx/html
   EXPOSE 80
   ```

---

## 📂 Project Architecture

```text
src/
├── app/
│   ├── components/    # Atomic UI components and layout sections
│   │   ├── ui/        # Reusable Radix-based primitives
│   │   └── ...        # Feature-specific sections (Hero, Footer, etc.)
│   ├── pages/         # Page-level components (HomePage, AboutPage, etc.)
│   ├── App.tsx        # Application root and provider setup
│   └── routes.tsx     # React Router navigation map
├── assets/            # Media assets (images, videos, fonts)
├── imports/           # SVG path definitions and external asset imports
└── styles/            # Global CSS, Tailwind configurations, and themes
```

---

## 🧪 Testing & Quality Assurance

### Current Status
- **Manual QA**: The project is currently verified for responsive consistency across standard viewports (Mobile, Tablet, Desktop).
- **Linter**: ESLint configuration (if present) ensures code quality.

### Future Roadmap
- **Unit Testing**: Integration of Vitest for component logic testing.
- **E2E Testing**: Implementation of Playwright or Cypress for user flow verification.
- **Performance**: Continuous monitoring via Lighthouse and Web Vitals.

---

## 🤝 Contributing

We welcome contributions! Please follow these standards:

1. **Code Style**: Follow the existing functional component pattern using TypeScript.
2. **Commit Messages**: Use [Conventional Commits](https://www.conventionalcommits.org/).
3. **Workflow**:
   - Fork the repository.
   - Create a feature branch (`git checkout -b feature/amazing-feature`).
   - Commit changes (`git commit -m 'feat: add amazing feature'`).
   - Push to branch (`git push origin feature/amazing-feature`).
   - Open a Pull Request.

---

## 🔍 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **Vite Build Failures** | Ensure Node.js is v18+. Clear `node_modules` and `package-lock.json`, then re-install. |
| **Missing Assets** | Verify that large media files (MP4/PNG) are correctly referenced in `src/assets`. |
| **Tailwind 4 Errors** | Check that your PostCSS config is up to date and compatible with `@tailwindcss/vite`. |
| **Animation Lag** | Reduce the number of active particle systems in `ParticleSystem.tsx` for low-end devices. |

---

## 📄 License & Contact

Distributed under the **MIT License**. See `LICENSE` for more information.

**Nebula Safe Tech**
- **Website**: [nebulasafetech.com](https://nebulasafetech.com)
- **Email**: [contact@nebulasafetech.com](mailto:contact@nebulasafetech.com)
- **GitHub**: [@NebulaSafeTech](https://github.com/NebulaSafeTech)
