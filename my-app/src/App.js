import React, { useState } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  // States for the number of students (rows) and subjects (columns)
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  // State to store student names and subject names
  const [students, setStudents] = useState(Array(rows).fill("").map(() => Array(cols).fill("")));
  const [subjects, setSubjects] = useState(Array(cols).fill(""));

  // State for selected subject for the graph
  const [selectedSubject, setSelectedSubject] = useState(0);

  // Handle row changes (students)
  const handleRowChange = (e) => {
    const newRows = Number(e.target.value);
    const updatedStudents = [...students];

    // If we're adding rows, push new empty rows
    if (newRows > rows) {
      for (let i = rows; i < newRows; i++) {
        updatedStudents.push(Array(cols).fill(""));  // Add new student row with empty data
      }
    } else if (newRows < rows) {
      updatedStudents.length = newRows;
    }

    setRows(newRows);
    setStudents(updatedStudents);
  };

  // Handle column changes (subjects)
  const handleColChange = (e) => {
    const newCols = Number(e.target.value);
    const updatedStudents = students.map(row => {
      if (newCols > cols) {
        return [...row, ...Array(newCols - cols).fill("")];
      } else {
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

  // Handle subject name input
  const handleSubjectNameChange = (e, colIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[colIndex] = e.target.value;
    setSubjects(updatedSubjects);
  };

  // Handle selecting subject for the graph
  const handleSubjectChange = (e) => {
    setSelectedSubject(Number(e.target.value));
  };

  // Generate chart data for the selected subject
  const chartData = {
    labels: students.map((_, index) => `Student ${index + 1}`), // Labels: student names
    datasets: [
      {
        label: `Scores for ${subjects[selectedSubject] || `Subject ${selectedSubject + 1}`}`,
        data: students.map((_, rowIndex) => rowIndex + selectedSubject + 2), // Calculate rowIndex + selectedSubject + 2
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
        tension: 0.1, // Line smoothness
      },
    ],
  };

  // Button click to generate the graph
  const generateGraph = () => {
    if (subjects[selectedSubject]) {
      return <Line data={chartData} />;
    } else {
      alert("Please select a subject first!");
    }
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
                    onChange={(e) => handleSubjectNameChange(e, colIndex)}
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
                    {rowIndex + colIndex + 2} {/* Score: rowIndex + colIndex + 2 */}
                  </td>
                ))}
                {/* Display the total score */}
                <td>{students[rowIndex].reduce((acc, curr, index) => acc + (index + 1) + (rowIndex + 1), 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Dropdown to select a subject for the graph */}
        <div>
          <label>Select Subject for Graph: </label>
          <select onChange={handleSubjectChange} value={selectedSubject}>
            {subjects.map((subject, index) => (
              <option key={index} value={index}>
                {subject || `Subject ${index + 1}`}
              </option>
            ))}
          </select>
        </div>

        {/* Button to generate graph */}
        <div>
          <button onClick={generateGraph}>Generate Graph</button>
        </div>

        {/* Display graph */}
        <div>
          {generateGraph()}
        </div>
      </header>
    </div>
  );
}

export default App;
