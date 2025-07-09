import { formatDate, isDateInRange, getDaysDifference, getRelativeTime } from '../calendarUtils';
import { format } from 'date-fns';

describe('Date Utils', () => {
  it('should format date correctly', () => {
    const date = new Date('2023-12-25T10:30:00');
    expect(formatDate(date, 'MM/dd/yyyy')).toBe('12/25/2023');
    expect(formatDate(date, 'yyyy-MM-dd')).toBe('2023-12-25');
    expect(formatDate(date, 'dd MMM yyyy')).toBe('25 Dec 2023');
  });

  it('should handle invalid dates', () => {
    const invalidDate = new Date('invalid');
    expect(formatDate(invalidDate)).toBe('Invalid Date');
  });

  it('should check if date is in range', () => {
    const date = new Date('2023-12-25');
    const startDate = new Date('2023-12-20');
    const endDate = new Date('2023-12-30');
    expect(isDateInRange(date, startDate, endDate)).toBe(true);
    const outsideDate = new Date('2023-12-31');
    expect(isDateInRange(outsideDate, startDate, endDate)).toBe(false);
  });

  it('should calculate days difference', () => {
    const date1 = new Date('2023-12-25');
    const date2 = new Date('2023-12-20');
    expect(getDaysDifference(date1, date2)).toBe(5);
    expect(getDaysDifference(date2, date1)).toBe(-5);
  });

  it('should get relative time', () => {
    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    expect(getRelativeTime(hourAgo)).toBe('1 hour ago');
    expect(getRelativeTime(dayAgo)).toBe('1 day ago');
  });
});
