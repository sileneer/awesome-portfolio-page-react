import { z } from 'zod';
import navigation from './navigation.json';
import personalInfo from './personalInfo.json';
import resume from './resume.json';
import projects from './projects.json';
import contact from './contact.json';
import research from './research.json';

// ---------------------------------------------------------------------------
// Schema for src/data/navigation.json.
// ---------------------------------------------------------------------------
export const navigationSchema = z.object({
  brand: z.string().min(1),
  menuItems: z
    .array(
      z.object({
        name: z.string().min(1),
        path: z.string().startsWith('/'),
        component: z.string().min(1),
      }),
    )
    .min(1),
});

export const personalInfoSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string().min(1),
  photo: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  alternatePhone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  website: z.string().url().optional(),
  languages: z.array(z.string()).optional(),
});

const httpUrl = z.string().url().refine((value) => /^https?:\/\//i.test(value), 'Use an HTTP(S) URL');
const localAssetPath = (extension) => z.string().refine((value) => {
  try {
    const decoded = decodeURIComponent(value);
    return new RegExp(`^/(?!/)[^?#]+\\.(${extension})$`, 'i').test(decoded)
      && !/[\\\s]/.test(decoded)
      && !decoded.split('/').some((part) => part === '.' || part === '..');
  } catch { return false; }
}, 'Use a site-root-relative asset path without traversal');
const imagePath = localAssetPath('avif|gif|ico|jpe?g|png|svg|webp');
const pdfPath = localAssetPath('pdf');

const experienceItemSchema = z.object({
  company: z.string().min(1),
  logo: z.union([httpUrl, imagePath]).optional(),
  role: z.string().min(1),
  dates: z.string().min(1),
  description: z.string().min(1),
  type: z.string().optional(),
  location: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
});

const educationItemSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  dates: z.string().min(1),
  gpa: z.string().optional(),
  grade: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  coursework: z.array(z.string()).optional(),
  extracurriculars: z.array(z.string()).optional(),
});

const credentialSchema = z.object({
  title: z.string().min(1),
  certificateLink: z.string().url().optional(),
});

export const resumeSchema = z.object({
  summary: z.string().min(1),
  experience: z.array(experienceItemSchema),
  education: z.array(educationItemSchema),
  skills: z.array(z.string()),
  skillCategories: z
    .array(
      z.object({
        category: z.string().min(1),
        items: z.array(z.string()),
      }),
    )
    .optional(),
  certifications: z.array(credentialSchema).optional(),
  awards: z.array(credentialSchema).optional(),
  interests: z.array(z.string()).optional(),
  cvDownload: z.string().optional(),
});

const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  technologies: z.array(z.string()),
  link: z.string().url().optional(),
  screenshots: z.array(z.string()).optional(),
  role: z.string().optional(),
  duration: z.string().optional(),
  dates: z.string().optional(),
});

export const projectsSchema = z.array(projectSchema);

export const contactSchema = z.object({
  message: z.string().min(1),
  responseTime: z.string().min(1).max(40).optional(),
  alternateEmail: z.string().email().optional(),
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
});

const text = z.string().trim().min(1);
const researchLinks = z.object({
  paper: httpUrl.optional(), doi: httpUrl.optional(),
  pdf: z.union([httpUrl, pdfPath]).optional(), code: httpUrl.optional(),
  dataset: httpUrl.optional(), slides: httpUrl.optional(), project: httpUrl.optional(),
});
const researchId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase slug');
const publication = z.object({
  id: researchId, title: text,
  authors: z.array(z.object({ name: text, isOwner: z.boolean().optional() })).min(1),
  year: z.number().int().min(1000).max(9999), venue: text.optional(),
  type: z.enum(['journal', 'conference', 'workshop', 'thesis', 'other']),
  status: z.enum(['published', 'accepted', 'preprint', 'under-review', 'in-preparation']),
  summary: text, abstract: text.optional(), topics: z.array(text).optional(),
  links: researchLinks.optional(), bibtex: text.optional(),
});
const researchProject = z.object({
  id: researchId, title: text, summary: text, question: text.optional(),
  contribution: text.optional(), collaborators: z.array(text).optional(),
  institution: text.optional(), dates: text.optional(),
  status: z.enum(['ongoing', 'completed', 'on-hold']),
  topics: z.array(text).optional(), links: researchLinks.optional(),
});
export const researchSchema = z.object({
  introduction: z.object({
    statement: text.optional(), areas: z.array(text).optional(),
    profiles: z.array(z.object({ label: text, url: httpUrl })).optional(),
    collaboration: z.boolean().optional(),
  }).optional(),
  featuredWork: z.object({ kind: z.enum(['publication', 'project']), id: researchId }).optional(),
  publications: z.array(publication), projects: z.array(researchProject),
}).superRefine((value, ctx) => {
  for (const collection of ['publications', 'projects']) {
    const ids = new Set();
    value[collection].forEach((item, i) => {
      if (ids.has(item.id)) ctx.addIssue({ code: 'custom', path: [collection, i, 'id'], message: 'Duplicate id' });
      ids.add(item.id);
    });
  }
  if (value.featuredWork) {
    const collection = value.featuredWork.kind === 'publication' ? value.publications : value.projects;
    if (!collection.some((item) => item.id === value.featuredWork.id)) {
      ctx.addIssue({ code: 'custom', path: ['featuredWork'], message: 'Featured work must reference an existing entry' });
    }
  }
});

const VALIDATIONS = [
  { name: 'navigation.json',   schema: navigationSchema,   data: navigation   },
  { name: 'personalInfo.json', schema: personalInfoSchema, data: personalInfo },
  { name: 'resume.json',       schema: resumeSchema,       data: resume       },
  { name: 'projects.json',     schema: projectsSchema,     data: projects     },
  { name: 'research.json', schema: researchSchema, data: research },
  { name: 'contact.json',      schema: contactSchema,      data: contact      },
];

export function validatePortfolioData() {
  for (const { name, schema, data } of VALIDATIONS) {
    const result = schema.safeParse(data);
    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `  • ${issue.path.join('.') || '(root)'}: ${issue.message}`)
        .join('\n');
      throw new Error(`Portfolio data invalid in ${name}:\n${issues}`);
    }
  }
}
