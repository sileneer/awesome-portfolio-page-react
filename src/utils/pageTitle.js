// Document title per route: the home page leads with the owner's name and
// professional title (matches the static index.html title); inner pages lead
// with the page name.
export const pageTitle = (item, personalInfo) =>
  item.path === '/'
    ? `${personalInfo.name} | ${personalInfo.title}`
    : `${item.name} | ${personalInfo.name}`;
