export const PUBLICATION_STATUSES = {
  published: 'Published', accepted: 'Accepted', preprint: 'Preprint',
  'under-review': 'Under review', 'in-preparation': 'In preparation',
};
export const PROJECT_STATUSES = { ongoing: 'Ongoing', completed: 'Completed', 'on-hold': 'On hold' };
export const PUBLICATION_TYPES = {
  journal: 'Journal', conference: 'Conference', workshop: 'Workshop', thesis: 'Thesis', other: 'Other',
};
export const sortedPublications = (research) =>
  [...(research?.publications ?? [])].sort((a, b) => b.year - a.year);

export const featuredResearch = (research) => {
  const feature = research?.featuredWork;
  if (!feature) return null;
  const items = feature.kind === 'publication' ? research.publications : research.projects;
  const item = items?.find((entry) => entry.id === feature.id);
  return item ? { item, kind: feature.kind } : null;
};
