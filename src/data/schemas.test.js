import {
  validatePortfolioData,
  personalInfoSchema,
  resumeSchema,
  projectsSchema,
} from './schemas';

test('all portfolio JSON files match their zod schemas', () => {
  expect(() => validatePortfolioData()).not.toThrow();
});

test('new optional fields are accepted by their schemas', () => {
  // alternatePhone in personalInfo
  expect(
    personalInfoSchema.safeParse({
      name: 'Test',
      title: 'Test',
      bio: 'Test',
      photo: '/test.jpg',
      email: 'test@example.com',
      phone: '+1 555',
      alternatePhone: '+44 555',
    }).success,
  ).toBe(true);

  // type in experience, grade in education, skillCategories in resume
  expect(
    resumeSchema.safeParse({
      summary: 'Test',
      experience: [
        { company: 'Test', role: 'Test', dates: '2024', description: 'Test', type: 'Full-time' },
      ],
      education: [
        { degree: 'Test', institution: 'Test', dates: '2024', gpa: '3.8', grade: 'First Class' },
      ],
      skills: ['Python'],
      skillCategories: [
        { category: 'Backend', items: ['Node.js', 'Express'] },
      ],
    }).success,
  ).toBe(true);

  // dates in projects
  expect(
    projectsSchema.safeParse([
      { name: 'Test', description: 'Test', technologies: ['React'], dates: 'Jan 2024 - Jun 2024' },
    ]).success,
  ).toBe(true);
});

test('new optional fields can be omitted (backward compatible)', () => {
  expect(
    personalInfoSchema.safeParse({
      name: 'Test',
      title: 'Test',
      bio: 'Test',
      photo: '/test.jpg',
      email: 'test@example.com',
    }).success,
  ).toBe(true);

  expect(
    resumeSchema.safeParse({
      summary: 'Test',
      experience: [{ company: 'Test', role: 'Test', dates: '2024', description: 'Test' }],
      education: [{ degree: 'Test', institution: 'Test', dates: '2024' }],
      skills: ['Python'],
    }).success,
  ).toBe(true);

  expect(
    projectsSchema.safeParse([
      { name: 'Test', description: 'Test', technologies: ['React'] },
    ]).success,
  ).toBe(true);
});
