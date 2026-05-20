import { z } from 'zod';
import navigation from './navigation.json';
import personalInfo from './personalInfo.json';
import resume from './resume.json';
import projects from './projects.json';
import contact from './contact.json';

// ---------------------------------------------------------------------------
// Example schema — matches src/data/navigation.json. Use this as the pattern
// when filling in the four TODO schemas below.
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
  location: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  website: z.string().url().optional(),
  languages: z.array(z.string()).optional(),
});

const experienceItemSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  dates: z.string().min(1),
  description: z.string().min(1),
  location: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
});

const educationItemSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  dates: z.string().min(1),
  gpa: z.string().optional(),
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
});

export const projectsSchema = z.array(projectSchema);

export const contactSchema = z.object({
  message: z.string().min(1),
  responseTime: z.string().min(1).max(40).optional(),
  alternateEmail: z.string().email().optional(),
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
});

const VALIDATIONS = [
  { name: 'navigation.json',   schema: navigationSchema,   data: navigation   },
  { name: 'personalInfo.json', schema: personalInfoSchema, data: personalInfo },
  { name: 'resume.json',       schema: resumeSchema,       data: resume       },
  { name: 'projects.json',     schema: projectsSchema,     data: projects     },
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
