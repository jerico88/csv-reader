export const parseCSV = (csvData: string) => {
    const rows = csvData.trim().split('\n');
    const headers = rows[0].split(',');
    const data = rows.slice(1).map((row) => {
      const values = row.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {} as { [key: string]: string });
    });
    return data;
  };