"use client"; // Esto indica que este componente es un Client Component

import React, { useState } from "react";
import Papa from "papaparse";
import UserList from "../components/data/UserList";
import RegisterForm from "../components/users/RegisterForm";

const CsvUploader: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const parsedData = result.data as string[][];
          setData(parsedData.slice(0, 20)); // Mostrar solo los primeros 20 elementos
        },
        header: false, // Cambia a true si el CSV tiene cabecera
        skipEmptyLines: true, // Evitar líneas vacías
      });
    }
  };

  return (
    <div>
      <h2>Cargar archivo CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {data[0].map((_, index) => (
                <th key={index}>Columna {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <UserList/>
      <RegisterForm/>
    </div>
  );
};

export default CsvUploader;
