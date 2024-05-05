import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearch with search term', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});