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

// ---------------------------------------------------------------------------
// TODO — replace each `z.unknown()` with a real schema.
//
// Reference: docs/PORTFOLIO_DATA_STRUCTURE.md lists every field per file.
// Your domain knowledge of which fields are TRULY optional (vs. always
// required for the UI to render) belongs here. Until you replace z.unknown(),
// validation is effectively a no-op for that file.
//
// Useful zod patterns:
//   z.string().min(1)          // non-empty string
//   z.string().url()           // URL shape
//   z.string().email()         // email shape
//   z.string().optional()      // field may be missing
//   z.array(z.string())        // array of strings
//   z.array(...).min(1)        // non-empty array
// ---------------------------------------------------------------------------
export const personalInfoSchema = z.unknown();
export const resumeSchema = z.unknown();
export const projectsSchema = z.unknown();
export const contactSchema = z.unknown();

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
