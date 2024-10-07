"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import Plot from "react-plotly.js";

const CsvUploader: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);
  const [plotData, setPlotData] = useState<any[]>([]);
  const [velocityData, setVelocityData] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const parsedData = result.data as string[][];
          setData(parsedData.slice(0, 20)); // Mostrar solo los primeros 20 elementos
          preparePlotData(parsedData);
          prepareVelocityData(parsedData);
        },
        header: false,
        skipEmptyLines: true,
      });
    }
  };

  const convertExcelDateToJSDate = (excelDate: number) => {
    // Excel date to JS Date conversion
    const date = new Date((excelDate - 25569) * 86400 * 1000);
    return date;
  };

  const preparePlotData = (csvData: string[][]) => {
    const xValues = csvData.map((row) => convertExcelDateToJSDate(parseFloat(row[0]))); // Convertir a fecha
    const yValues = csvData.map((row) => parseFloat(row[1])); // Densidad

    const trace1 = {
      x: xValues,
      y: yValues,
      mode: "lines+markers",
      name: "Densidad",
      line: { shape: "spline", color: "blue" },
    };

    setPlotData([trace1]);
  };

  const prepareVelocityData = (csvData: string[][]) => {
    const yValues = csvData.map((row) => parseFloat(row[1])); // Densidad (asumiendo que está en la columna 1)
    const xValues = csvData.map((row) => parseFloat(row[4])); // Velocidad (asumiendo que está en la columna 4)

    const trace2 = {
      x: xValues,
      y: yValues,
      mode: "lines+markers",
      name: "Velocidad vs Densidad",
      line: { shape: "spline", color: "red" },
    };

    setVelocityData([trace2]);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      
      {plotData.length > 0 && (
        <Plot
          data={plotData}
          layout={{
            title: "Densidad vs Hora",
            xaxis: { title: "Hora", tickformat: "%Y-%m-%d %H:%M" },
            yaxis: { title: "Densidad" }
          }}
        />
      )}

      {velocityData.length > 0 && (
        <Plot
          data={velocityData}
          layout={{
            title: "Densidad vs Velocidad",
            xaxis: { title: "Velocidad" },
            yaxis: { title: "Densidad" }
          }}
        />
      )}

      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Densidad</th>
              <th>Velocidad</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row[0]}</td> {/* Cambiado para mostrar la columna de Hora correcta */}
                <td>{row[1]}</td> {/* Densidad */}
                <td>{row[4]}</td> {/* Velocidad */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CsvUploader;
