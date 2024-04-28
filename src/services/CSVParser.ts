import { QC_Model } from "../models/QC_Model";

const parseCSV = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const csvData = event.target?.result as string;
            const rows = csvData.split('\n');
            const headers = rows[0].split(',').map(header => header.trim());
            const parsedData: QC_Model[] = [];
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',');
                if (values.length !== headers.length) {
                    console.log('Invalid CSV format: Row ' + (i + 1) + ' has incorrect number of columns');
                    continue;
                }

                const rowData: any = {};
                for (let j = 0; j < headers.length; j++) {
                    if (values[j] !== undefined)
                        rowData[headers[j]] = values[j].trim();
                }
                try {
                    const newRow = new QC_Model(
                        parseInt(rowData.Metadata_Col),
                        rowData.Metadata_Row,
                        rowData.Metadata_Well,
                        rowData.Metadata_perturbation_id,
                        rowData.Metadata_perturbation_type,
                        parseInt(rowData.QC_cell_count),
                        parseFloat(rowData.QC_cell_count_cov),
                        rowData.QC_cov_failed === 'True',
                        parseFloat(rowData.QC_position_effect)
                    );
                    parsedData.push(newRow);
                }catch{
                    console.log('Invalid CSV format: Row ' + (i + 1) + ' has incorrect data');
                }
              
            }
            resolve(parsedData);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};

export default parseCSV;