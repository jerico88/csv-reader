import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from '../components/DataTable';

const mockData = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'London' },
  { name: 'Bob', age: 35, city: 'Paris' },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    const { getByText } = render(<DataTable data={mockData} searchTerm="" />);
    const nameCell = getByText('John');
    const ageCell = getByText('30');
    const cityCell = getByText('New York');

    expect(nameCell).toBeInTheDocument();
    expect(ageCell).toBeInTheDocument();
    expect(cityCell).toBeInTheDocument();
  });

  it('filters data based on search term', () => {
    const { queryByText } = render(<DataTable data={mockData} searchTerm="jane" />);
    const johnCell = queryByText('John');
    const janeCell = queryByText('Jane');

    expect(johnCell).not.toBeInTheDocument();
    expect(janeCell).toBeInTheDocument();
  });

  it('handles pagination', () => {
    const { getByText, queryByText } = render(<DataTable data={mockData} searchTerm="" />);
    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    const johnCell = queryByText('John');
    expect(johnCell).not.toBeInTheDocument();
  });
});