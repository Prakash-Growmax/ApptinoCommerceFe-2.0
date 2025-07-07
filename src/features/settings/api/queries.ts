export const settingsQueryKeys = {
  all: ['settings'] as const,
  company: (companyId: number) => [...settingsQueryKeys.all, 'company', companyId] as const,
  branches: () => [...settingsQueryKeys.all, 'branches'] as const,
  branchList: (filters: {
    companyId: number;
    userId: number;
    page: number;
    rowPerPage: number;
    searchString: string;
  }) => [...settingsQueryKeys.branches(), filters] as const,
};