import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUploader from '../components/FileUploader';

describe('FileUploader', () => {
  const mockOnFileUpload = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders file input and upload button', () => {
    const { getByTestId } = render(<FileUploader onFileUpload={mockOnFileUpload} />);
    const fileInput = getByTestId('file-input');
    const uploadButton = getByTestId('upload-button');

    expect(fileInput).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
  });

  it('calls onFileUpload with selected file', async () => {
    const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
    const { getByTestId } = render(<FileUploader onFileUpload={mockOnFileUpload} />);
    const fileInput = getByTestId('file-input');

    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = getByTestId('upload-button');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockOnFileUpload).toHaveBeenCalledWith(file);
    });
  });

  it('shows upload progress', async () => {
    const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
    const { getByTestId } = render(<FileUploader onFileUpload={mockOnFileUpload} />);
    const fileInput = getByTestId('file-input');

    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = getByTestId('upload-button');
    fireEvent.click(uploadButton);

    const progressBar = await waitFor(() => getByTestId('progress-bar'));
    expect(progressBar).toBeInTheDocument();
  });
});