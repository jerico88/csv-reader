import { parseCSV } from '../utils/csvParser';;
import '@testing-library/jest-dom';

describe('csvParser', () => {
  it('parses CSV data correctly', () => {
    const csvData = 'name,age,city\nJohn,30,New York\nJane,25,London';
    const parsedData = parseCSV(csvData);

    expect(parsedData).toEqual([
      { name: 'John', age: '30', city: 'New York' },
      { name: 'Jane', age: '25', city: 'London' },
    ]);
  });

  it('handles empty CSV data', () => {
    const csvData = '';
    const parsedData = parseCSV(csvData);
    expect(parsedData).toEqual([]);
  });

  it('handles CSV data with missing values', () => {
    const csvData = 'name,age,city\nJohn,30,\nJane,,London';
    const parsedData = parseCSV(csvData);

    expect(parsedData).toEqual([
      { name: 'John', age: '30', city: '' },
      { name: 'Jane', age: '', city: 'London' },
    ]);
  });
});