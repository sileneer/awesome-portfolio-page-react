# Portfolio Data Structure & Allowed Fields

Your portfolio data is organized into **separate JSON files** for better maintainability and modularity. Each file contains specific sections of your portfolio data.

## File Structure

```
src/data/
├── navigation.json       # Navigation menu configuration
├── personalInfo.json     # Personal information and bio
├── resume.json           # Professional experience and education
├── projects.json         # Portfolio projects
├── research.json         # Publications, research interests, and projects
└── contact.json          # Contact information and social links
```

---

## 📄 `src/data/personalInfo.json`

Contains your personal information displayed on the home page.

### Allowed Fields:
- `name` (string): Your full name
- `title` (string): Professional title (e.g., "Full Stack Developer")
- `email` (string): Primary contact email address
- `phone` (string): Contact phone number (e.g., "+1 (123) 456-7890")
- `alternatePhone` (string, optional): Secondary phone number (e.g., an international number)
- `location` (string): City, State/Country (e.g., "San Francisco, CA, USA")
- `linkedin` (string): LinkedIn profile URL
- `github` (string): GitHub profile URL
- `photo` (string): Path to profile photo (e.g., "/profile_photo.jpg" in public folder)
- `website` (string): Personal website or portfolio URL
- `bio` (string): Short professional bio or tagline
- `languages` (array of strings): Spoken/written languages (e.g., ["English", "Spanish"])

> **SEO note:** `name`, `title`, `bio`, `email`, `photo`, `website`, `linkedin`,
> and `github` also populate the static SEO tags in `index.html` (page title,
> description, Open Graph / Twitter cards, and Person JSON-LD) at build time —
> no need to edit `index.html` by hand. Set `website` to your deployed URL so
> social-share cards get absolute links. `public/manifest.json` is the one file
> still edited manually (PWA name and icons).

### Example:
```json
{
  "name": "John Doe",
  "title": "Full Stack Developer",
  "email": "john@example.com",
  "phone": "+1 (123) 456-7890",
  "location": "San Francisco, CA, USA",
  "linkedin": "https://www.linkedin.com/in/johndoe/",
  "github": "https://github.com/johndoe",
  "photo": "/profile_photo.jpg",
  "website": "https://johndoe.dev",
  "bio": "Passionate developer focused on building impactful web applications.",
  "languages": ["English", "Spanish"]
}
```

---

## 📄 `src/data/navigation.json`

Configures the navigation menu at the top of your portfolio.

### Allowed Fields:
- `brand` (string): Brand name or logo text displayed in navigation bar
- `menuItems` (array of objects): Navigation menu items
  - `name` (string): Display name of menu item
  - `path` (string): Route path (e.g., "/", "/resume", "/projects", "/contact")
  - `component` (string): Name of the page component to render at this path.
    Must match a key in `PAGE_COMPONENTS` in `src/App.jsx` (defaults:
    `HomePage`, `ResumePage`, `ProjectsPage`, `ContactPage`). Misspellings
    throw at app load.

### Example:
```json
{
  "brand": "John Doe",
  "menuItems": [
    { "name": "Home",     "path": "/",         "component": "HomePage" },
    { "name": "Resume",   "path": "/resume",   "component": "ResumePage" },
    { "name": "Projects", "path": "/projects", "component": "ProjectsPage" },
    { "name": "Contact",  "path": "/contact",  "component": "ContactPage" }
  ]
}
```

---

## 📄 `src/data/resume.json`

Contains your professional background, skills, and qualifications.

### Allowed Fields:
- `summary` (string): Professional summary or objective statement
- `cvDownload` (string): Path to downloadable PDF CV (e.g., "/CV.pdf" in public folder)
- `experience` (array of objects): Work experience entries
  - `company` (string): Company name
  - `logo` (string, optional): Company logo image path (e.g., `/companies/acme.svg`) or an HTTP(S) image URL; omit when unavailable
  - `role` (string): Job title/role
  - `dates` (string): Employment period (e.g., "2023 - Present")
  - `type` (string, optional): Employment type (e.g., "Full-time", "Part-time", "Internship")
  - `location` (string): Job location (e.g., "London, UK" or "Remote")
  - `description` (string): Job description and responsibilities
  - `technologies` (array of strings): Technologies used (e.g., ["React", "Node.js"])
  - `achievements` (array of strings): Key accomplishments and achievements
- `education` (array of objects): Education history
  - `degree` (string): Degree name (e.g., "B.Sc. in Computer Science")
  - `institution` (string): School/university name
  - `dates` (string): Attendance period (e.g., "2017 - 2021")
  - `gpa` (string, optional): Grade point average
  - `grade` (string, optional): Grade or classification for non-GPA systems (e.g., "First Class Honours", "II.1")
  - `location` (string, optional): School location
  - `description` (string, optional): Additional details
  - `coursework` (array of strings, optional): Relevant courses
  - `extracurriculars` (array of strings, optional): Activities and clubs
- `skills` (array of strings): Technical skills and technologies
- `skillCategories` (array of objects, optional): Skills grouped by category for richer display
  - `category` (string): Category name (e.g., "Frontend", "DevOps & Tools")
  - `items` (array of strings): Skills within this category
- `certifications` (array of objects): Professional certifications
  - `title` (string): Certification name
  - `certificateLink` (string, optional): Link to certificate
- `awards` (array of objects): Awards and honors
  - `title` (string): Award name
  - `certificateLink` (string, optional): Link to award certificate
- `interests` (array of strings): Personal interests and hobbies

### Example:
```json
{
  "summary": "Full Stack Developer with 5+ years of experience...",
  "cvDownload": "/CV.pdf",
  "experience": [
    {
      "company": "TechCorp",
      "role": "Frontend Engineer",
      "dates": "2023 - Present",
      "location": "London, UK",
      "description": "Lead development of dashboard features...",
      "technologies": ["React", "TypeScript", "Redux"],
      "achievements": ["Improved dashboard load time by 40%"]
    }
  ],
  "education": [
    {
      "degree": "B.Sc. in Computer Science",
      "institution": "Example University",
      "dates": "2017 - 2021",
      "gpa": "3.8",
      "coursework": ["Algorithms", "Web Development"],
      "extracurriculars": ["Coding Club President"]
    }
  ],
  "skills": ["JavaScript", "React", "Node.js", "Python"],
  "certifications": [
    {
      "title": "AWS Certified Developer",
      "certificateLink": "https://..."
    }
  ],
  "awards": [
    {
      "title": "Best Developer 2022",
      "certificateLink": "https://..."
    }
  ],
  "interests": ["Open Source", "Travel", "Photography"]
}
```

---

## 📄 `src/data/projects.json`

An array of your portfolio projects.

### Structure:
Array of project objects, each with the following fields:

- `name` (string): Project name
- `description` (string): Detailed project description
- `technologies` (array of strings): Technologies and tools used
- `link` (string): Project URL (GitHub repo or live demo)
- `screenshots` (array of strings): Paths to project images (e.g., ["/projects/app1.png"])
- `role` (string): Your role in the project (e.g., "Lead Developer")
- `duration` (string): Project duration (e.g., "6 months")
- `dates` (string, optional): Project date range (e.g., "Jan 2023 - Jun 2023")

### Example:
```json
[
  {
    "name": "E-Commerce Platform",
    "description": "A full-featured online shopping platform with cart, checkout, and payment integration.",
    "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
    "link": "https://github.com/johndoe/ecommerce",
    "screenshots": ["/projects/ecommerce1.png", "/projects/ecommerce2.png"],
    "role": "Full Stack Developer",
    "duration": "6 months"
  }
]
```

---

## 📄 `src/data/contact.json`

Additional contact information and social media links.

### Allowed Fields:
- `message` (string): Custom contact message or call-to-action
- `responseTime` (string, optional): Expected reply time shown on the Contact
  page's stat strip (e.g. "Within 24 hours", "Same day"). Max 40 characters.
  Falls back to "Within 24 hours" if omitted.
- `alternateEmail` (string, optional): Secondary email address
- `twitter` (string, optional): Twitter profile URL
- `facebook` (string, optional): Facebook profile URL

### Example:
```json
{
  "message": "Feel free to reach out for collaboration, freelance work, or just to connect!",
  "responseTime": "Within 24 hours",
  "alternateEmail": "contact@example.com",
  "twitter": "https://twitter.com/johndoe",
  "facebook": "https://facebook.com/johndoe"
}
```

---

## 🎨 Adding Images

### Profile Photo
- Add your photo to `public/profile_photo.jpg`
- Reference it in `personalInfo.json` as `"/profile_photo.jpg"`

### CV/Resume PDF
- Add your CV to `public/CV.pdf`
- Reference it in `resume.json` as `"/CV.pdf"`

### Project Screenshots
- Create a folder: `public/projects/`
- Add images: `public/projects/project1.png`, etc.
- Reference them in `projects.json` as `"/projects/project1.png"`

---

## ⚠️ Important Notes

1. **Data Validation**: Each JSON file is validated against a Zod schema in `src/data/schemas.js` at app startup. If a required field is missing, has the wrong type, or fails a constraint (e.g. paths must start with `/`), the browser console shows a clear error naming the file and the bad field path. Update the schema whenever you add new fields.
2. **Privacy**: Do not include sensitive or private information in your portfolio data.
3. **Image Paths**: All image paths should start with `/` and reference files in the `public/` folder.
4. **URLs**: Always use complete URLs for external links (including `https://`).
5. **Arrays**: Empty arrays are allowed (e.g., `"skills": []`) but will not display that section.
6. **Optional Fields**: Fields marked as optional can be omitted entirely.

---

## 🔧 Extending the Data Structure

If you need to add new fields:
1. Update the appropriate JSON file in `src/data/`
2. Update the matching schema in `src/data/schemas.js` so validation accepts
   the new field
3. Update this documentation
4. Modify the corresponding page component in `src/components/pages/`
5. Test thoroughly to ensure the new fields display correctly

### Adding a new page

The route table is driven from `navigation.json`, so adding a page takes three
small edits:

1. Create the new component, e.g. `src/components/pages/BlogPage.jsx`.
2. Register it in `src/App.jsx`: add a `lazy()` import and include `BlogPage`
   in the `PAGE_COMPONENTS` map.
3. Add a menu entry to `src/data/navigation.json`:
   ```json
   { "name": "Blog", "path": "/blog", "component": "BlogPage" }
   ```

No `<Route>` boilerplate to touch — App.jsx generates routes from the menu
items at render time.



---

## `src/data/research.json`

Controls the **Research** page and conditional Home preview. Ships with empty
arrays; add your actual work here. This file is validated at startup. Removing the
`ResearchPage` item from `navigation.json` also hides the Home preview.

### Top-level fields

| Field | Required | Description |
| --- | --- | --- |
| `publications` | Yes | Publication entries; may be empty |
| `projects` | Yes | Research-project entries; may be empty |
| `introduction` | No | Statement, areas, academic profiles, collaboration CTA |
| `featuredWork` | No | Object with `kind` (`publication` or `project`) and an existing entry `id` |

`introduction` accepts optional `statement` (nonempty text), `areas` (string array),
`profiles` (array of objects with `label` and HTTP(S) `url`), and `collaboration`
(boolean). The collaboration CTA appears only when true. Omit unavailable fields
rather than supplying empty strings. With no statement, a neutral description appears.

### Publications

| Field | Required | Description |
| --- | --- | --- |
| `id` | Yes | Unique lowercase slug, e.g. `adaptive-models` |
| `title` | Yes | Paper title |
| `authors` | Yes | Nonempty ordered array of `{ "name": "Full Name", "isOwner": true }`; owner flag optional |
| `year` | Yes | Integer from 1000 through 9999; determines descending year groups |
| `type` | Yes | `journal`, `conference`, `workshop`, `thesis`, or `other` |
| `status` | Yes | `published`, `accepted`, `preprint`, `under-review`, or `in-preparation` |
| `summary` | Yes | Short description of the work or contribution |
| `venue` | No | Journal, conference, or institution name |
| `abstract` | No | Full abstract in a keyboard-accessible native disclosure |
| `topics` | No | Array of nonempty strings |
| `links` | No | Resource links described below |
| `bibtex` | No | Supplied citation text; enables Copy citation |

Author emphasis uses `isOwner`, without guessing identity from names. Statuses are
never inferred from links. Citation text is copied verbatim; clipboard failure
shows selectable text for manual copying.

### Research projects

Required: `id` (unique lowercase slug), `title`, `summary`, `status` (`ongoing`,
`completed`, or `on-hold`). Optional: `question`, `contribution`, `institution`,
`dates` (display text), `collaborators` (array of names), `topics` (string array),
and `links`.

Ids must be unique within each collection. HTML anchors use `publication-` and
`project-` prefixes. Projects follow the JSON array order and remain separate
from publications. A featured project uses its contribution, when present, or
its summary. Without an explicit feature, the Home preview uses the newest
publication, falling back to the first research project.

### Resource links

Optional keys: `paper`, `doi`, `pdf`, `code`, `dataset`, `slides`, `project`.
Each requires a full HTTP(S) URL; `doi` takes `https://doi.org/...`, not a bare DOI.
`pdf` also accepts a site-root-relative path such as `/papers/my-paper.pdf`; put
that file under `public/papers/`. These paths respect the configured Vite base.
Local paths must end in `.pdf` without traversal, whitespace, query, or fragment.
Other protocols and protocol-relative URLs are rejected. Links open in labelled
new tabs. Missing links produce no buttons.

### Minimal configuration

```json
{
  "introduction": {
    "areas": [],
    "profiles": [],
    "collaboration": false
  },
  "publications": [],
  "projects": []
}
```

After adding a real entry, optionally set `featuredWork` to its exact `kind` and
`id`. Dangling references and duplicate ids produce readable validation errors.
Illustrative test records are never included in shipped portfolio content.

Year/type/topic filtering appears only with at least five publications and
multiple available values. Filters combine, show a result count, and support
reset. Small collections display without controls.


---

## Centralized images and documents

All page components resolve media through `src/utils/assets.js`. This is the one
place that discovers bundled assets and handles deployment-base paths; individual
pages do not maintain their own screenshot maps or default-file imports.

- **Bundled template assets:** kept under `src/assets/` and discovered automatically
  for AVIF, GIF, ICO, JPEG/JPG, PNG, SVG, WebP, and PDF files. JSON paths mirror that
  folder: `/projects/connect1.png` resolves the bundled source. Vite supplies the
  hashed deployment URL. Update default template images/CV in `src/assets/`.
- **Custom public resources:** place files in `public/` and use site-root-relative
  JSON paths. For example, `public/companies/acme.svg` becomes `/companies/acme.svg`,
  and `public/papers/study.pdf` becomes `/papers/study.pdf`. Do not include `public/`
  or a deployment prefix in the JSON. A bundled asset takes priority if both folders
  contain the same path.
- **External resources:** HTTP(S) URLs are kept unchanged. Local public files are
  prefixed with the configured Vite base once, including on deployment sub-paths.
- **Portrait social previews:** custom portraits should use `public/` so their
  configured URL is also available to the generated social metadata. The default
  portrait has a public copy for this purpose.

### Adding a company logo

1. Put your logo in `public/companies/` (create the folder if needed), or add a
   bundled logo under `src/assets/companies/`.
2. Add `"logo": "/companies/acme.svg"` to the matching experience in `resume.json`.
   This is an illustrative filename; supply your own image file.
3. The résumé displays it in a fixed-size tile beside the role/company, using
   `object-fit: contain` so the artwork is not cropped. A neutral white image
   surface keeps logo colors readable in both themes.

Example of the optional field within an existing experience entry:

```json
{
  "company": "Acme",
  "logo": "/companies/acme.svg",
  "role": "Engineer",
  "dates": "2026 - Present",
  "description": "Your responsibilities and contributions."
}
```

Omit `logo` to retain the text-only layout. Failed images show a neutral company
icon without a broken image. Logos reserve 48 by 48 pixels and load lazily.
Supported local image extensions are AVIF, GIF, ICO, JPEG/JPG, PNG, SVG, and WebP;
external logos use HTTP(S). Empty strings, other protocols, protocol-relative URLs,
non-image local paths, and path traversal are rejected at startup.
