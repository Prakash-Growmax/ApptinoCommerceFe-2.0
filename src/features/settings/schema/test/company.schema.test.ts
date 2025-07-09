import { companyDetailsFormSchema, updateCompanyRequestSchema } from '../company.schema';

describe('Company Schema', () => {
  it('should validate correct company data', () => {
    const validData = {
      name: 'Test Company',
      website: 'https://testcompany.com',
      taxId: '123456',
      businessTypeId: 1,
      accountTypeId: 1,
      currencyId: 1,
      subIndustryId: 1,
      defaultEmail: 'test@company.com',
      logo: 'logo.png',
    };

    const result = companyDetailsFormSchema.safeParse(validData);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('should reject invalid website URL', () => {
    const invalidData = {
      name: 'Test Company',
      website: 'invalid-url',
      taxId: '123456',
      businessTypeId: 1,
      accountTypeId: 1,
      currencyId: 1,
      subIndustryId: 1,
      defaultEmail: 'test@company.com',
      logo: 'logo.png',
    };

    const result = companyDetailsFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const errorPaths = result.error.issues.map(issue => issue.path.join('.'));
      expect(errorPaths).toContain('website');
    }
  });

  it('should require mandatory fields', () => {
    const incompleteData = {
      name: '',
      website: '',
      taxId: '',
      businessTypeId: 0,
      accountTypeId: 0,
      currencyId: 0,
      subIndustryId: 0,
    };

    const result = companyDetailsFormSchema.safeParse(incompleteData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const errorPaths = result.error.issues.map(issue => issue.path[0]);
      expect(errorPaths).toContain('name');
      expect(errorPaths).toContain('taxId');
      expect(errorPaths).toContain('businessTypeId');
      expect(errorPaths).toContain('accountTypeId');
      expect(errorPaths).toContain('currencyId');
      expect(errorPaths).toContain('subIndustryId');
    }
  });

  it('should validate update company request schema', () => {
    const validUpdateData = {
      id: 1,
      name: 'Updated Company Name',
      website: 'https://updatedcompany.com',
      taxDetailsId: {
        id: 5,
        pan: 'ABCDE1234F',
      },
      businessTypeId: { id: 2 },
      accountTypeId: { id: 3 },
      currencyId: { id: 4 },
      subIndustryId: { id: 6 },
      defaultEmail: 'update@company.com',
      logo: 'updated-logo.png',
    };

    const result = updateCompanyRequestSchema.safeParse(validUpdateData);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(validUpdateData);
    }
  });

  it('should reject invalid update company data with missing nested objects', () => {
    const invalidUpdateData = {
      id: 1,
      name: 'Updated Company Name',
      website: 'https://updatedcompany.com',
      // missing taxDetailsId, businessTypeId, etc.
      defaultEmail: 'update@company.com',
      logo: 'updated-logo.png',
    };

    const result = updateCompanyRequestSchema.safeParse(invalidUpdateData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const errorPaths = result.error.issues.map(issue => issue.path.join('.'));
      expect(errorPaths).toContain('taxDetailsId');
      expect(errorPaths).toContain('businessTypeId');
      expect(errorPaths).toContain('accountTypeId');
      expect(errorPaths).toContain('currencyId');
      expect(errorPaths).toContain('subIndustryId');
    }
  });
});
