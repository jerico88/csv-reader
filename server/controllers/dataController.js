const csv = require('csv-parser');
const fs = require('fs');

let csvData = [];

const uploadData = (req, res) => {
  const csvFile = req.files.csvFile;
  const fileStream = fs.createReadStream(csvFile.path);

  fileStream
    .pipe(csv())
    .on('data', (data) => csvData.push(data))
    .on('end', () => {
      res.status(200).json({ message: 'CSV data uploaded successfully' });
    })
    .on('error', (error) => {
      res.status(500).json({ error: 'Error uploading CSV data' });
    });
};

const getPaginatedData = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = csvData.slice(startIndex, endIndex);

  res.status(200).json(paginatedData);
};

const searchData = (req, res) => {
  const searchTerm = req.query.searchTerm.toLowerCase();

  const filteredData = csvData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm)
    )
  );

  res.status(200).json(filteredData);
};

module.exports = {
  uploadData,
  getPaginatedData,
  searchData,
};