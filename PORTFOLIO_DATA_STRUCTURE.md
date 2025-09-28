# Portfolio Data Structure & Allowed Fields

Your portfolio data is stored in `src/data/portfolio.json`. To ensure safety and compatibility, only the following fields are allowed for each section:

## personalInfo
- `name`: Your full name
- `title`: Professional title (e.g., Full Stack Developer)
- `email`: Contact email address
- `phone`: Contact phone number
- `location`: City, Country
- `linkedin`: LinkedIn profile URL
- `github`: GitHub profile URL
- `photo`: Relative path to your profile photo (e.g., `src/data/photo.jpg`). Place your image in the `src/data` folder.
- `website`: Personal website or portfolio URL
- `bio`: Short bio or tagline
- `languages`: Array of spoken/written languages

## navigation
- `brand`: Name or brand for navigation bar
- `menuItems`: Array of menu items, each with `name` and `path`

## resume
- `summary`: Short professional summary
- `experience`: Array of work experiences (each with `company`, `role`, `dates`, `location`, `description`, `technologies`, `achievements`)
- `education`: Array of education entries (each with `degree`, `institution`, `dates`, `gpa`, `coursework`, `extracurriculars`)
- `skills`: Array of skills (e.g., JavaScript, React)
- `certifications`: Array of certifications (e.g., AWS Certified Developer)
- `awards`: Array of awards or honors
- `interests`: Array of interests/hobbies
- `cvDownload`: Relative path to downloadable PDF CV (e.g., `src/CV.pdf`)

## projects
- `name`: Project name
- `description`: Brief description
- `technologies`: Array of technologies used
- `link`: Project URL or repository
- `screenshots`: Array of image paths for project screenshots
- `role`: Your role in the project
- `duration`: Project duration

## contact
- `message`: Custom contact message
- `twitter`: Twitter profile URL
- `alternateEmail`: Alternate contact email
- `facebook`: Facebook profile URL
- `calendly`: Calendly or booking link

---

**Important:**
- Only use the fields listed above in your `portfolio.json`.
- Do not include sensitive or private information.
- If you want to allow new fields, update this file and the `allowedFields` section in `portfolio.json`. This will help future automation and LLM-based editing tools understand your data structure.

