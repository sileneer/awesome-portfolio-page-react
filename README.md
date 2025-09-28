# Awesome Portfolio Page React

A customizable React template for developer portfolios.

## Portfolio Data Structure & Allowed Fields

Your portfolio data is stored in `src/data/portfolio.json`. To ensure safety and compatibility, only the following fields are allowed for each section:

### personalInfo
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

### navigation
- `brand`: Name or brand for navigation bar
- `menuItems`: Array of menu items, each with `name` and `path`

### resume
- `summary`: Short professional summary
- `experience`: Array of work experiences (each with `company`, `role`, `dates`, `location`, `description`, `technologies`, `achievements`)
- `education`: Array of education entries (each with `degree`, `institution`, `dates`, `gpa`, `coursework`, `extracurriculars`)
- `skills`: Array of skills (e.g., JavaScript, React)
- `certifications`: Array of certifications (e.g., AWS Certified Developer)
- `awards`: Array of awards or honors
- `interests`: Array of interests/hobbies
- `cvDownload`: Relative path to downloadable PDF CV (e.g., `src/CV.pdf`)

### projects
- `name`: Project name
- `description`: Brief description
- `technologies`: Array of technologies used
- `link`: Project URL or repository
- `screenshots`: Array of image paths for project screenshots
- `role`: Your role in the project
- `duration`: Project duration

### contact
- `message`: Custom contact message
- `twitter`: Twitter profile URL
- `alternateEmail`: Alternate contact email
- `facebook`: Facebook profile URL
- `calendly`: Calendly or booking link

---

**Important:**
- Only use the fields listed above in your `portfolio.json`.
- Do not include sensitive or private information.
- If you want to allow new fields, update this README and the `allowedFields` section in `portfolio.json`. This will help future automation and LLM-based editing tools understand your data structure.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
