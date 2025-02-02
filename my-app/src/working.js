import React, { useState } from 'react';
import './App.css';

function App() {
  // States for the number of rows and columns
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  // Function to handle row changes
  const handleRowChange = (e) => {
    setRows(e.target.value);
  };

  // Function to handle column changes
  // const handleColChange = (e) => {
  //   setCols(e.target.value);
  // };

  const handleColChange = (e) => {
    setCols(Number(e.target.value));
  };
  

  // Function to generate the table
  const generateTable = () => {
    let table = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        const sum = i+1+j+1
        row.push(<td key={j}>Row {i + 1}, Col {j + 1} = {sum}</td>);
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Test Details</h1>

        {/* Input fields for rows and columns */}
        <div>
          <label>Number of Students:</label>
          <input
            type="number"
            value={rows}
            onChange={handleRowChange}
            min="1"
          />
        </div>
        <div>
          <label>Number of Subjects:</label>
          <input
            type="number"
            value={cols}
            onChange={handleColChange}
            min="1"
          />
        </div>

        {/* Table with dynamically generated rows and columns */}
        <table>
          <thead>
            <tr>
              <th>Student/Subject</th>
              {[...Array(cols)].map((_, index) => (
                <th key={index}>Subject {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {/* Row Header */}
                <td>Person {rowIndex + 1}</td>
                {/* Dynamic table cells */}
                {[...Array(cols)].map((_, colIndex) => (
                  <td key={colIndex}>
                    {/* {rowIndex + 1}, {colIndex + 1} */}
                    {/* {rowIndex + 1},{colIndex + 1} = {rowIndex + 1 + colIndex + 1} */}
                    {rowIndex + 1 + colIndex + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;