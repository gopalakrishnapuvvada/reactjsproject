import React, { useState } from 'react';
import './App.css';

function App() {
  // States for the number of students (rows) and subjects (columns)
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  
  // State to store student names
  const [students, setStudents] = useState(Array(rows).fill("").map(() => Array(cols).fill("")));
  const [subjects, setSubjects] = useState(Array(cols).fill(""));

  // Handle row changes (students)
  const handleRowChange = (e) => {
    const newRows = Number(e.target.value);

    // Preserve existing student data and add new rows if needed
    const updatedStudents = [...students];

    // If we're adding rows, push new empty rows
    if (newRows > rows) {
      for (let i = rows; i < newRows; i++) {
        updatedStudents.push(Array(cols).fill(""));  // Add new student row with empty data
      }
    } else if (newRows < rows) {
      // If we're removing rows, slice off excess rows
      updatedStudents.length = newRows;
    }

    setRows(newRows);
    setStudents(updatedStudents);
  };

  // Handle column changes (subjects)
  const handleColChange = (e) => {
    const newCols = Number(e.target.value);

    // Preserve existing student data and adjust the number of columns
    const updatedStudents = students.map(row => {
      if (newCols > cols) {
        // If we are adding columns, add new empty columns
        return [...row, ...Array(newCols - cols).fill("")];
      } else {
        // If we are removing columns, slice off excess columns
        return row.slice(0, newCols);
      }
    });

    setCols(newCols);
    setStudents(updatedStudents);
  };

  // Handle student name input
  const handleStudentNameChange = (e, rowIndex) => {
    const updatedStudents = [...students];
    updatedStudents[rowIndex][0] = e.target.value;
    setStudents(updatedStudents);
  };

  // Calculate the total score for each student (sum of all subjects)
  const calculateTotal = (rowIndex) => {
    return Array.from({ length: cols }, (_, colIndex) => rowIndex + colIndex + 2)  // +2 for 1-based indexing
                .reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Exams Results</h1>

        {/* Input fields for rows (students) and columns (subjects) */}
        <div>
          <label>Number of Students (Rows): </label>
          <input
            type="number"
            value={rows}
            onChange={handleRowChange}
            min="1"
          />
        </div>
        <div>
          <label>Number of Subjects (Columns): </label>
          <input
            type="number"
            value={cols}
            onChange={handleColChange}
            min="1"
          />
        </div>

        {/* Table with dynamically generated students' names and subject scores */}
        <table>
          <thead>
            <tr>
              <th>Student</th>
              {[...Array(cols)].map((_, colIndex) => (
                <th key={colIndex}>
                  <input
                    type="text"
                    value={subjects[colIndex]}
                    placeholder={`Subject ${colIndex + 1}`}
                    onChange={(e) => {
                      const updatedSubjects = [...subjects];
                      updatedSubjects[colIndex] = e.target.value;
                      setSubjects(updatedSubjects);
                    }}
                  />
                </th>
              ))}
              <th>Total</th> {/* Add Total Column */}
            </tr>
          </thead>
          <tbody>
            {students.map((_, rowIndex) => (
              <tr key={rowIndex}>
                {/* Student Name input */}
                <td>
                  <input
                    type="text"
                    value={students[rowIndex][0]}
                    placeholder={`Student ${rowIndex + 1}`}
                    onChange={(e) => handleStudentNameChange(e, rowIndex)}
                  />
                </td>
                {/* Dynamic table cells for each subject */}
                {[...Array(cols)].map((_, colIndex) => (
                  <td key={colIndex}>
                    {/* Calculating score as rowIndex + colIndex + 2 */}
                    {rowIndex + colIndex + 2} {/* Add 2 for 1-based indexing */}
                  </td>
                ))}
                {/* Display the total score */}
                <td>{calculateTotal(rowIndex)}</td> {/* Show the total score */}
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
