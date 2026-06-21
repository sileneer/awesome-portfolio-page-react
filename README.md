# Awesome Portfolio Page React

🚀 A modern, customizable React template for developer portfolios. Built with React and **Material-UI (@mui/material)** featuring a clean, professional design with multiple sections to showcase your skills, experience, and projects.

![Portfolio Screenshot](docs/readme-screenshot1.jpeg)

## ✨ Features

- **🎨 Material-UI Design**: Professional Material Design components with consistent theming
- **📱 Responsive Design**: Built-in responsive breakpoints for all device sizes
- **🏠 Home Page**: Professional landing page with hero section and highlight cards
- **📄 Resume Section**: Experience timeline, education, skills, languages, certifications, awards, and interests, with a sticky section navigator
- **💼 Projects Showcase**: Filterable project grid with a detail dialog (screenshot gallery, role/duration, technologies, and links)
- **📞 Contact Page**: Copyable contact methods (email, alternate email, phone) with a mailto CTA, an at-a-glance stat strip (reply time, location, availability), and a social links list
- **🎨 Theme System**: Three-state preference (light / dark / system) with live OS-theme following and custom Material-UI palette
- **♿ Accessible**: Clean heading hierarchy, ARIA attributes, focus states, and reduced-motion support
- **⚙️ Fully Customizable**: All content driven by simple JSON configuration files
- **🔒 Data Validation**: Zod schemas validate the JSON at startup, with a friendly error screen if something is off

## 🎨 Material-UI Implementation

This portfolio is built with Material-UI components throughout:

### Key Components Used
- **Layout**: `Container`, `Grid`, `Box` for responsive layouts
- **Navigation**: a custom floating bottom nav with active highlighting and a three-state theme toggle
- **Content**: `Card`, `CardContent`, `Dialog` for elevated content and the project detail view
- **Typography**: Consistent text hierarchy with the Material-UI typography system
- **Interactive**: `Button`, `IconButton`, `Chip` components with built-in ripple effects
- **Media**: `Avatar` and lazy-loaded images with proper aspect ratios
- **Icons**: `@mui/icons-material` for professional vector icons
- **Motion**: [Framer Motion](https://www.framer.com/motion/) for entrance, hover, and scroll-triggered animations

### Theme Features
- Custom color palette maintaining professional appearance
- Responsive typography that scales with screen size
- Component style overrides for consistent branding
- Material Design elevation system for depth

## 🚀 Quick Start

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sileneer/awesome-portfolio-page-react.git
   cd awesome-portfolio-page-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and visit [http://localhost:5173](http://localhost:5173)

### Customization

Your portfolio data is organized into separate JSON files for easy management:

1. **Personal Information**: Edit `src/data/personalInfo.json`
   - Update your name, title, bio, contact info, social links, and languages

2. **Navigation**: Edit `src/data/navigation.json`
   - Customize your brand name and menu items

3. **Resume**: Edit `src/data/resume.json`
   - Add work experience, education, skills, certifications, awards, and interests

4. **Projects**: Edit `src/data/projects.json`
   - Showcase your portfolio projects with descriptions and screenshots

5. **Contact**: Edit `src/data/contact.json`
   - Add additional contact methods and social media links

6. **Images**:
   - Add your profile photo to `public/profile_photo.png`
   - Add your CV to `public/CV.pdf` (optional)
   - Add project screenshots to `public/projects/` folder (optional)

See [PORTFOLIO_DATA_STRUCTURE.md](./docs/PORTFOLIO_DATA_STRUCTURE.md) for complete details on available fields and data structure.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.jsx        # Floating bottom nav with theme toggle
│   ├── Footer.jsx            # Footer with attribution
│   ├── SectionHeading.jsx    # Shared icon + gradient section heading
│   ├── StatItem.jsx          # Shared at-a-glance stat figure
│   ├── ErrorBoundary.jsx     # Friendly fallback for boot/render errors
│   └── pages/
│       ├── HomePage.jsx      # Landing page with hero and stat cards
│       ├── ResumePage.jsx    # Résumé sections, timeline, and section nav
│       ├── ProjectsPage.jsx  # Projects grid with filter + detail dialog
│       └── ContactPage.jsx   # Stat strip + contact methods + socials
├── context/
│   └── ThemeContext.jsx      # Light / dark / system theme state
├── data/
│   ├── navigation.json       # Navigation menu configuration
│   ├── personalInfo.json     # Personal information, bio, and languages
│   ├── resume.json           # Professional experience and education
│   ├── projects.json         # Portfolio projects
│   ├── contact.json          # Contact information and social links
│   └── schemas.js            # Zod schemas — JSON files validated at boot
├── utils/
│   └── experience.js         # Derives years of experience from date strings
├── App.jsx                   # Main app component, theme, and data validation
└── index.jsx                 # Entry point (wraps the app in an error boundary)
```

## 🎨 Pages Overview

### Home Page
- Hero section with your photo, name, professional title, and bio
- Links to LinkedIn and GitHub
- A live availability indicator on the portrait
- Statistics cards showing years of experience, projects, and skills count

### Resume Page
- Intro band with a professional summary, at-a-glance stats (years, roles, skills, certifications), and a downloadable CV link
- Sticky section navigation (desktop) with scrollspy that tracks the current section as you scroll
- Work experience on a single-rail timeline — location, achievements, and technologies per role
- Education with GPA, coursework, and activities
- Skills, languages, and interests shown as tag badges
- Certifications and awards with optional credential links

### Projects Page
- Intro band with project and technology counts
- Filter projects by technology
- Project cards showing role, duration, technologies, and a screenshot
- Click a card to open a detail dialog with a screenshot gallery, full description, and links (source code / live demo)

### Contact Page
- **Stat strip** at the top: typical reply time, location, and a live availability indicator (paired with the HomePage status indicator)
- **Two-column contact card**: on the left, "Reach me directly" lists email, alternate email, and phone as rows — each with a copy-to-clipboard button and a `mailto:`/`tel:` link — with a prominent `Email me` CTA below
- On the right, "Find me online" lists each configured social link (LinkedIn, GitHub, website, Twitter, Facebook)
- Each contact method and social link is shown only when its value is set
- Professional contact message above the card
- Configurable response time string in `contact.json` (`responseTime`)

## 📋 Available Scripts

### Development
- **`npm start`** - Start development server at [http://localhost:5173](http://localhost:5173)
- **`npm test`** - Run the test suite once (Vitest)
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run build`** - Build for production (outputs to `build/` folder)

### Production Build
The production build is optimized and minified, ready for deployment to any static hosting service.

## 🚀 Deployment

This project can be deployed to various platforms:

### GitHub Pages
```bash
npm run build
# Deploy the build/ folder to your hosting service
```

### Netlify / Vercel
Simply connect your GitHub repository and these services will automatically build and deploy your portfolio.

### Other Static Hosting
Build the project (`npm run build`) and upload the `build/` folder contents to any static web hosting service.

## 🛠️ Customization Guide

### Basic Setup

#### 1. Personal Information (`src/data/personalInfo.json`)
Update your basic information:
- Name, title, and professional bio
- Contact details (email, phone, location)
- Social media links (LinkedIn, GitHub, website)
- Languages you speak (shown on the Resume page)
- Profile photo path

#### 2. Navigation (`src/data/navigation.json`)
Customize your navigation bar:
- Brand name or logo text
- Menu items and their routes

#### 3. Resume (`src/data/resume.json`)
Build your professional profile:
- Professional summary
- Work experience with achievements
- Education history
- Technical skills
- Certifications and awards
- Personal interests
- Downloadable CV link

#### 4. Projects (`src/data/projects.json`)
Showcase your work:
- Project name and description
- Technologies used
- Your role and project duration
- Screenshots and demo links

#### 5. Contact (`src/data/contact.json`)
Add additional contact options:
- Custom contact message displayed under the page title
- Typical response time string (e.g. "Within 24 hours") shown on the stat strip
- Alternate email
- Social media (Twitter, Facebook)

### Adding Images
- **Profile Photo**: Add your photo as `public/profile_photo.png`
- **CV File**: Add your resume PDF as `public/CV.pdf`
- **Project Screenshots**: Create `public/projects/` folder and add your project images

### Styling & Theming
The application uses Material-UI theming configured in `src/App.jsx`:
- **Theme Configuration**: Modify the `getDesignTokens()` function in `App.jsx`
- **Color Palette**: Change primary, secondary, and background colors
- **Typography**: Adjust font families, sizes, and weights
- **Component Overrides**: Customize Material-UI component styles
- **Responsive Breakpoints**: Adjust mobile/tablet/desktop layouts

For detailed theme customization, see the Material-UI documentation: https://mui.com/material-ui/customization/theming/

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Bundled with [Vite](https://vitejs.dev/) and built on [React](https://react.dev/) + [Material-UI](https://mui.com/) + [Framer Motion](https://www.framer.com/motion/)
- Runtime JSON validation by [Zod](https://zod.dev/)
- Icons and design inspiration from modern portfolio trends
- Thank you to all contributors who help improve this template

---

**Ready to showcase your work?** Clone this repo and create your professional portfolio in minutes! ✨
