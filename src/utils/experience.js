// Derives total years of experience from the earliest 4-digit year (19xx/20xx)
// found across all experience date strings. Shared by the Home and Résumé pages
// so they can't drift apart.
export const yearsOfExperience = (experience) => {
  if (!Array.isArray(experience)) return 0;
  const years = [];
  experience.forEach((exp) => {
    const matches = String(exp?.dates ?? '').match(/\b(?:19|20)\d{2}\b/g);
    if (matches) matches.forEach((y) => years.push(parseInt(y, 10)));
  });
  if (!years.length) return 0;
  const diff = new Date().getFullYear() - Math.min(...years);
  return diff > 0 ? diff : 0;
};
