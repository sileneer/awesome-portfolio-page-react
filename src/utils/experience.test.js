import { yearsOfExperience } from './experience';

describe('yearsOfExperience', () => {
  it('counts from the earliest 4-digit year across all roles', () => {
    const years = yearsOfExperience([{ dates: '2021 - 2023' }, { dates: '2019 - 2021' }]);
    expect(years).toBe(new Date().getFullYear() - 2019);
  });

  it('returns 0 when there are no parseable years or no input', () => {
    expect(yearsOfExperience([{ dates: 'Present' }])).toBe(0);
    expect(yearsOfExperience([])).toBe(0);
    expect(yearsOfExperience(undefined)).toBe(0);
  });
});
