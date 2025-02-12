import React, { useState, useEffect } from 'react'
import {
  Grid,
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import { styled } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'

const headingFont = createTheme({
  typography: {
    h6: {
      color: 'rgba(24, 46, 70, 0.9)',
      fontFamily: 'Poppins !important',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '27px',
    },
    h4: {
      color: 'rgba(0, 0, 0, 1)',
      fontFamily: 'Poppins !important',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '510',
      lineHeight: '24px',
    },
    h5: {
      color: '#5A5A5A',
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 'normal',
    },
    subtitle2: {
      color: 'rgba(0, 0, 0, 1)',
      fontFamily: 'Poppins !important',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '21px',
    },
    subtitle3: {
      color: 'rgba(0, 0, 0, 1)',
      fontFamily: 'Poppins !important',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '27px',
    },
  },
  button: {
    outlined: {
      color: '#858585',
    },
  },
})

// Styled Components
const SelectBox = styled(Select)({
  width: '100%',
  background: 'white',
  borderRadius: '5px',
})

const SubmitButton = styled(Button)({
  backgroundColor: 'rgba(1, 130, 112, 1)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(1, 110, 95, 1)',
  },
})

const StatBox = styled(Box)(({ color }) => ({
  backgroundColor: color,
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
  borderRadius: '8px',
  fontWeight: 'bold',
}))

const UserPefornmanceMonitor = () => {
  // State Variables
  const [selectedUser, setSelectedUser] = useState(null)
  const [testView, setTestView] = useState('Test View')
  const [resultView, setResultView] = useState('Top')
  const [value, setValue] = useState('10')
  const [loading, setLoading] = useState(true)
  const [showGrid, setShowGrid] = useState(false) // Show Grid after submit
  const [userList, setUserList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const testData = [
    {
      TestID: '4563',
      emailId: 'john.doe@email.com',
      mobileNumber: '9876543210',
      marksObtained: 85,
      negativeMarks: -5,
      attemptedQuestions: 45,
      unattemptedQuestions: 5,
      skippedQuestions: 2,
      wrongAnswers: 3,
      nationalRank: 120,
      stateRank: 15,
      districtRank: 2,
    },
    {
      userName: 'Jane Smith',
      emailId: 'jane.smith@email.com',
      mobileNumber: '9123456789',
      marksObtained: 78,
      negativeMarks: -8,
      attemptedQuestions: 42,
      unattemptedQuestions: 8,
      skippedQuestions: 4,
      wrongAnswers: 6,
      nationalRank: 150,
      stateRank: 20,
      districtRank: 5,
    },
    {
      userName: 'Alex Brown',
      emailId: 'alex.brown@email.com',
      mobileNumber: '9785634120',
      marksObtained: 92,
      negativeMarks: -3,
      attemptedQuestions: 47,
      unattemptedQuestions: 3,
      skippedQuestions: 1,
      wrongAnswers: 2,
      nationalRank: 95,
      stateRank: 12,
      districtRank: 1,
    },
    {
      userName: 'Emily Clark',
      emailId: 'emily.clark@email.com',
      mobileNumber: '9658741236',
      marksObtained: 67,
      negativeMarks: -12,
      attemptedQuestions: 38,
      unattemptedQuestions: 12,
      skippedQuestions: 6,
      wrongAnswers: 9,
      nationalRank: 220,
      stateRank: 30,
      districtRank: 8,
    },
    {
      userName: 'Michael Lee',
      emailId: 'michael.lee@email.com',
      mobileNumber: '9987456123',
      marksObtained: 80,
      negativeMarks: -6,
      attemptedQuestions: 44,
      unattemptedQuestions: 6,
      skippedQuestions: 3,
      wrongAnswers: 4,
      nationalRank: 130,
      stateRank: 18,
      districtRank: 3,
    },
  ]
  const filteredUserData = userList.filter((userdata) => {
    const phoneNumber = userdata.phoneNumber ? userdata.phoneNumber : ''
    const email = userdata.email.toLowerCase()
    const firstName =
      userdata.firstName && userdata.firstName !== null ? userdata.firstName.toLowerCase() : '' // Check if firstName is not null
    const lastName =
      userdata.lastName && userdata.lastName !== null ? userdata.lastName.toLowerCase() : '' // Check if lastName is not null
    const fullName = firstName + ' ' + lastName
    return (
      phoneNumber.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase()) ||
      fullName.includes(searchQuery.toLowerCase())
    )
  })
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    setLoading(true)
    const token = localStorage.getItem('status')
    if (!token) {
      throw new Error('Token not found in local storage.')
    }
    try {
      const response = await axios.get('/api/User/GetAll', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      setUserList(response.data.result)
      console.log(response.data.result)
    } catch (error) {
      console.error('Error fetching Users:', error)
    } finally {
      setLoading(false)
    }
  }
  console.log('userList', userList)
  const userOptions = userList.map((user) => {
    const phoneNumber = user.phoneNumber || 'Unknown Phone'
    const email = user.email || 'Unknown Email'
    const fullName = `${user.firstName || 'Unknown'} ${user.lastName || 'Unknown'}`

    return {
      value: user.id, // Assuming you want to use the user id as the value
      label: `${fullName} - ${phoneNumber} - ${email}`, // This combines the name, phone number, and email into a label
    }
  })

  console.log(userOptions)

  // const paginatedUsers = Array.isArray(userList)
  //   ? userList.slice((currentPage - 1) * page_size, currentPage * page_size)
  //   : []
  const handleUserSelection = (event, newValue) => {
    setSelectedUser(newValue)
  }

  const handleSubmit = () => {
    setShowGrid(true)
  }
  return (
    <Box sx={{ padding: '20px' }}>
      {/* Dropdowns */}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ThemeProvider theme={headingFont}>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
              Select User: <span style={{ color: 'red' }}>*</span>
            </Typography>
          </ThemeProvider>
          <Autocomplete
            options={userOptions} // Dynamic list of test options
            getOptionLabel={(option) => option.label} // Display text
            value={selectedUser}
            onChange={handleUserSelection}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select user by name/email/mobile number (single selection)"
                variant="outlined"
              />
            )}
            sx={{
              width: '100%',
              backgroundColor: 'white',
            }}
            ListboxProps={{
              style: {
                maxHeight: '200px', // Limit height for scrolling
                overflow: 'auto',
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Results Grid - Visible only after clicking Submit */}
      {selectedUser && (
        <Box sx={{ height: 500, width: '100%', mt: 2 }}>
          <DataGrid
            rows={testData.map((row, index) => ({ id: index, ...row }))}
            columns={[
              { field: 'userName', headerName: 'User Name', flex: 1 },
              { field: 'emailId', headerName: 'Email ID', flex: 1.5 },
              { field: 'mobileNumber', headerName: 'Mobile Number', flex: 1 },
              { field: 'marksObtained', headerName: 'Marks Obtained', flex: 1, type: 'number' },
              { field: 'negativeMarks', headerName: 'Negative Marks', flex: 1, type: 'number' },
              {
                field: 'attemptedQuestions',
                headerName: 'Attempted Question',
                flex: 1,
                type: 'number',
              },
              {
                field: 'unattemptedQuestions',
                headerName: 'Unattempted Questions',
                flex: 1,
                type: 'number',
              },
              {
                field: 'skippedQuestions',
                headerName: 'Skipped Questions',
                flex: 1,
                type: 'number',
              },
              { field: 'wrongAnswers', headerName: 'Wrong Answers', flex: 1, type: 'number' },
              { field: 'nationalRank', headerName: 'National Rank', flex: 1, type: 'number' },
              { field: 'stateRank', headerName: 'State Rank', flex: 1, type: 'number' },
              { field: 'districtRank', headerName: 'District Rank', flex: 1, type: 'number' },
            ]}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            disableSelectionOnClick
            sx={{
              '.MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within': {
                outline: 'none',
              },
              '.MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within': {
                outline: 'none',
              },
              '.MuiDataGrid-row.Mui-selected': {
                backgroundColor: 'transparent',
              },
              '.MuiDataGrid-columnHeaderTitle': {
                textOverflow: 'clip',
                whiteSpace: 'normal',
              },
              '.MuiDataGrid-columnHeader': {
                whiteSpace: 'normal',
                overflow: 'visible',
                wordBreak: 'break-word',
                backgroundColor: 'rgba(1, 130, 112, 1)',
                color: 'white',
              },
            }}
          />
        </Box>
      )}
    </Box>
  )
}
export default UserPefornmanceMonitor
