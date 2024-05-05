import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import DataTable from './components/DataTable';
import SearchBar from './components/SearchBar';
import { parseCSV } from './utils/csvParser';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = parseCSV(reader.result as string);
      setData(csvData);
    };
    reader.readAsText(file);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <FileUploader onFileUpload={handleFileUpload} />
      <SearchBar onSearch={handleSearch} />
      <DataTable data={data} searchTerm={searchTerm} />
    </div>
  );
};

export default App;