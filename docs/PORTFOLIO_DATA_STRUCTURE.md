# Portfolio Data Structure & Allowed Fields

Your portfolio data is organized into **separate JSON files** for better maintainability and modularity. Each file contains specific sections of your portfolio data.

## File Structure

```
src/data/
├── core/
│   └── navigation.json       # Navigation menu configuration
└── user/
    ├── personalInfo.json     # Personal information and bio
    ├── resume.json           # Professional experience and education
    ├── projects.json         # Portfolio projects
    └── contact.json          # Contact information and social links
```

---

## 📄 `src/data/user/personalInfo.json`

Contains your personal information displayed on the home page.

### Allowed Fields:
- `name` (string): Your full name
- `title` (string): Professional title (e.g., "Full Stack Developer")
- `email` (string): Primary contact email address
- `phone` (string): Contact phone number (e.g., "+1 (123) 456-7890")
- `location` (string): City, State/Country (e.g., "San Francisco, CA, USA")
- `linkedin` (string): LinkedIn profile URL
- `github` (string): GitHub profile URL
- `photo` (string): Path to profile photo (e.g., "/profile_photo.png" in public folder)
- `website` (string): Personal website or portfolio URL
- `bio` (string): Short professional bio or tagline
- `languages` (array of strings): Spoken/written languages (e.g., ["English", "Spanish"])

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
  "photo": "/profile_photo.png",
  "website": "https://johndoe.dev",
  "bio": "Passionate developer focused on building impactful web applications.",
  "languages": ["English", "Spanish"]
}
```

---

## 📄 `src/data/core/navigation.json`

Configures the navigation menu at the top of your portfolio.

### Allowed Fields:
- `brand` (string): Brand name or logo text displayed in navigation bar
- `menuItems` (array of objects): Navigation menu items
  - `name` (string): Display name of menu item
  - `path` (string): Route path (e.g., "/", "/resume", "/projects", "/contact")

### Example:
```json
{
  "brand": "John Doe",
  "menuItems": [
    { "name": "Home", "path": "/" },
    { "name": "Resume", "path": "/resume" },
    { "name": "Projects", "path": "/projects" },
    { "name": "Contact", "path": "/contact" }
  ]
}
```

---

## 📄 `src/data/user/resume.json`

Contains your professional background, skills, and qualifications.

### Allowed Fields:
- `summary` (string): Professional summary or objective statement
- `cvDownload` (string): Path to downloadable PDF CV (e.g., "/CV.pdf" in public folder)
- `experience` (array of objects): Work experience entries
  - `company` (string): Company name
  - `role` (string): Job title/role
  - `dates` (string): Employment period (e.g., "2023 - Present")
  - `location` (string): Job location (e.g., "London, UK" or "Remote")
  - `description` (string): Job description and responsibilities
  - `technologies` (array of strings): Technologies used (e.g., ["React", "Node.js"])
  - `achievements` (array of strings): Key accomplishments and achievements
- `education` (array of objects): Education history
  - `degree` (string): Degree name (e.g., "B.Sc. in Computer Science")
  - `institution` (string): School/university name
  - `dates` (string): Attendance period (e.g., "2017 - 2021")
  - `gpa` (string, optional): Grade point average
  - `location` (string, optional): School location
  - `description` (string, optional): Additional details
  - `coursework` (array of strings, optional): Relevant courses
  - `extracurriculars` (array of strings, optional): Activities and clubs
- `skills` (array of strings): Technical skills and technologies
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

## 📄 `src/data/user/projects.json`

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

## 📄 `src/data/user/contact.json`

Additional contact information and social media links.

### Allowed Fields:
- `message` (string): Custom contact message or call-to-action
- `alternateEmail` (string, optional): Secondary email address
- `twitter` (string, optional): Twitter profile URL
- `facebook` (string, optional): Facebook profile URL
- `calendly` (string, optional): Calendly or meeting scheduler link

### Example:
```json
{
  "message": "Feel free to reach out for collaboration, freelance work, or just to connect!",
  "alternateEmail": "contact@example.com",
  "twitter": "https://twitter.com/johndoe",
  "facebook": "https://facebook.com/johndoe"
}
```

---

## 🎨 Adding Images

### Profile Photo
- Add your photo to `public/profile_photo.png`
- Reference it in `personalInfo.json` as `"/profile_photo.png"`

### CV/Resume PDF
- Add your CV to `public/CV.pdf`
- Reference it in `resume.json` as `"/CV.pdf"`

### Project Screenshots
- Create a folder: `public/projects/`
- Add images: `public/projects/project1.png`, etc.
- Reference them in `projects.json` as `"/projects/project1.png"`

---

## ⚠️ Important Notes

1. **Data Validation**: Only use the fields listed above to ensure compatibility with the application components.
2. **Privacy**: Do not include sensitive or private information in your portfolio data.
3. **Image Paths**: All image paths should start with `/` and reference files in the `public/` folder.
4. **URLs**: Always use complete URLs for external links (including `https://`).
5. **Arrays**: Empty arrays are allowed (e.g., `"skills": []`) but will not display that section.
6. **Optional Fields**: Fields marked as optional can be omitted entirely.

---

## 🔧 Extending the Data Structure

If you need to add new fields:
1. Update the appropriate JSON file in `src/data/`
2. Update this documentation
3. Modify the corresponding page component in `src/components/pages/`
4. Test thoroughly to ensure the new fields display correctly

