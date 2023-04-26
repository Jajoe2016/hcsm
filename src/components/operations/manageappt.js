import React, { useState }from 'react';
import {format, parseISO} from 'date-fns';
import Container from '../../reusables/container';
import OutlinedCard from '../../reusables/card';
import DataTable from '../../reusables/table';
import HorizontalNonLinearStepper from '../../reusables/linearstepper';
import useFetch from '../Helpers/useFetch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
//ui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, ThemeProvider, Stack } from '@mui/material';
import theme from '../../reusables/theme';
// import { GridRowParams } from '@mui/x-data-grid';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';


const createPatient = async(patientData)=>{
  return fetch('http://localhost:3001/createpatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientData)
    })
      .then(data => data.json())
  
}

const createAppointment = async(apptData)=>{
  return fetch('http://localhost:3001/createappt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apptData)
    })
      .then(data => data.json())
  
}

const updateAppointment = async(apptData)=>{
  return fetch('http://localhost:3001/updateappt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apptData)
    })
      .then(data => data.json())
  
}

// const getUser = async(userData)=>{
//   return fetch('http://localhost:3001/getuser', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     })
//       .then(data => data.json())
// }

// var horizontalStepsObject = {};

function ManageAppt() {
  const [cardActionClicked, setcardActionClicked] = useState(false);
  const [id, setId] = useState();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDOB] = useState();
  const [mrn, setMRN] = useState();
  const [knownissues, setknownIssues] = useState('{}');
  const [doctor, setDoctor] = useState();
  const [operationcode, setOperationcode] = useState();
  const [statusCode, setStatusCode] = useState();
  const [apptStatus, setApptStatus] = useState();
  const [table, setTable] = useState('today');
  // const [tableLength, setTableLength] = useState(0);
  const [date, setDate] = useState();

  const [tabValue, setTabValue] = useState('1');
  if ( apptStatus == null) setApptStatus('NOT STARTED');
  var todayTableRows;
  var todayTableLoading;
  var allTableRows;
  var allTableLoading;
  var tableLength;

  let columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'mrn', headerName: 'MRN', width: 130 },
    { field: 'datetime', headerName: 'Appointment time', width:250 },
    { field: 'doctor', headerName: 'Doctor', width: 70 },
    { field: 'status', headerName: 'Status', width: 200 },
    { headerName: "Actions", width: 200,
    renderCell: ({ row }: Partial<GridRowParams>) => 
    <div> <Button onClick ={(e) => { 
      e.stopPropagation();
      resetApptUpdate();
      renderDetailsButton(row);
      }}>
      Edit
    </Button>
    <Button onClick ={(e) => { 
      e.stopPropagation();
      resetApptUpdate();
      renderProgressButton(row);
      }}>
      Start
    </Button>
    </div>
    },
  ];

  var {loading,data} = useFetch(`http://localhost:3001/get${table}appts`);
  todayTableRows = data;
  todayTableLoading = loading;
  var {loading,data} = useFetch("http://localhost:3001/getallappts");
  allTableRows = data;
  allTableLoading = loading;

  const formatDate = (date) => {
    if (!date) return format(new Date(), 'yyyy-MM-dd kk:mm:ss' );
    else return format(parseISO(date), 'yyyy-MM-dd kk:mm:ss' );
  }
  const changeTableData = () => {
    if (table == 'today') {
      setTable('all');
      tableLength = allTableRows.length;
    }
    else { 
      setTable('today');
      tableLength = todayTableRows.length;
    }
}


  var tableAppt = 
          <Grid container rowSpacing={1} columnSpacing={{ xs: 100, sm: 300, md: 0 }}>
                  <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                { 
                  table == 'today' ? <div> Today's Appointments </div> : <div> All Appointments</div>
                }
                  </Typography>
                  <Button size="small" onClick={changeTableData}>Click here to switch between today and all appointments. </Button>
                  
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 100, sm: 300, md: 0 }}>
                    <div> { 
                    table == 'today' ? (todayTableLoading ? <CircularProgress/> : <DataTable rows={todayTableRows} columns={columns}/>)
                      : (allTableLoading ? <CircularProgress/> : <DataTable rows={allTableRows} columns={columns}/>)
                    }</div>
                  </Grid>
          </Grid>
       
  var stepLabels = ['Reception', 'Doctor Exam', 'Payment', 'Lab','Finalize Visit' ];
  var rowDetails = [id,]
  var horizontalSteps = 
        <div>
          <HorizontalNonLinearStepper steps = {stepLabels}/>
        </div>

  const renderDetailsButton = (row) => {
    setOperationcode(3);
    if (row.id) setId(row.id);
    if (row.mrn) setMRN(row.mrn);
    if (row.doctor) setDoctor(row.doctor);
    if (row.datetime) setDate(row.datetime);
  }

  const renderProgressButton = (row) => {
    setOperationcode(4);
    if (row.id) setId(row.id);
    if (row.mrn) setMRN(row.mrn);
    if (row.doctor) setDoctor(row.doctor);
    if (row.datetime) setDate(row.datetime);
    row.status = 'STARTED';

    // var apptSteps = 
    //     <div>
    //       <HorizontalNonLinearStepper steps={stepLabels}/>
    //     </div>
    // console.log(apptSteps);
    // horizontalStepsObject = {...horizontalStepsObject, ...{id : apptSteps}};
  }

  async function resetApptUpdate() {
  setOperationcode(0);
  setId(null);
  setMRN(null);
  setDoctor(null);
  setDate(null);
  }

  async function handleSubmit() {
    const data = await createPatient({ "id": id, "firstname" : firstname, "lastname" : lastname,  "dob": dob, "email": email, "phone": phone, "knownissues" : knownissues, "mrn" : mrn});
    setStatusCode(data.code);
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  async function handleApptSubmit() {
    const data = await createAppointment({ "id": id, "mrn" : mrn, "date" : date, "doctor": doctor });
    setStatusCode(data.code);
  }

  async function handleApptUpdate() {
    const data = await updateAppointment({ "id": id, "date" : date, "doctor": doctor });
    setStatusCode(data.code);
  }
  
  async function handleButton() {
  setOperationcode(1);
  }

  if ( operationcode === 1 || cardActionClicked === `reg1`) {
    return (
      <Container>       
        <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField name="id" label='patient id' required sx={{mb: 2}} variant='filled' size='small' type='string' color='neutral' onChange={e => setId(e.target.value)}></TextField>
            <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
              <TextField name="firstname" label='First Name' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral' onChange={e => setFirstName(e.target.value)}></TextField>
              <TextField name="lastname" label='Last Name' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral' onChange={e => setLastName(e.target.value)}></TextField>
            </Stack>
            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
              <TextField name="email" label='Email' required sx={{mb: 1}} variant='filled' size='small' type='email' color='neutral' onChange={e => setEmail(e.target.value)}></TextField>
              <TextField name="phone" label='Phone' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral'onChange={e => setPhone(e.target.value)}></TextField>
            </Stack>
            <TextField name="dob" label="Date of Birth" required sx={{mb: 1}} variant='outlined' size='medium' type="date" color='neutral' onChange={e => setDOB(e.target.value)}/>
            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
              <TextField name="mrn" label='Medical Record No' sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral' onChange={e => setMRN(e.target.value)}></TextField>
              {/* <TextField name="knownissues" label='Known Issues' sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral'onChange={e => setknownIssues(e.target.value)}></TextField> */}
            </Stack>
            <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">Create Patient</Button>
          </FormControl>
      </form>
      </ThemeProvider>
      </Container>
    )
  }

  if ( operationcode === 2 || cardActionClicked === `apt1`) {
    return (
      <Container>       
        <ThemeProvider theme={theme}>
      <form onSubmit={handleApptSubmit}>
          <FormControl>
            <TextField name="id" label='appointment id' required sx={{mb: 2}} variant='filled' size='small' type='string' color='neutral' onChange={e => setId(e.target.value)}></TextField>
            <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
              <TextField name="mrn" label='patient mrn' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral' onChange={e => setMRN(e.target.value)}></TextField>
            </Stack>
            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
              <TextField name="Doctor" label='Doctor username' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral'onChange={e => setDoctor(e.target.value)}></TextField>
            </Stack>
            <TextField name="date" label="Date and time" required sx={{mb: 1}} variant='outlined' size='medium' type="datetime-local" color='neutral' onChange={e => setDate(e.target.value)} />
            <Button variant="contained" sx={{mb: 3}} color='neutral' type="submit">Create Appointment</Button>
          </FormControl>
      </form>
      </ThemeProvider>
      </Container>
    )
  }
  
  return(
    <Container>      
        <ThemeProvider theme={theme}>
          <Box sx={{ width: 500, height: 50 }}>
          {/* <Grid container rowSpacing={2} columnSpacing={{ xs: 100, sm: 300, md: 0 }}> */}
          <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
          { statusCode === 200 ? <div>Operation was succesful! Appointment Mangement page. </div> : <div> Appointment Mangement page.</div>}
          </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, width: 1000, height: 160}}>
          <Grid container spacing={1} rowSpacing={3}>
          <OutlinedCard setcardActionClicked={setcardActionClicked} title='Register New Patient' description='click below to register a new patient' buttonString='register new patient' uuid='reg1'/>
          {/* <OutlinedCard setcardActionClicked={setcardActionClicked} title='Search Patient' description='click below to search patient' buttonString='Search patient' uuid='ser1'/> */}
          <OutlinedCard setcardActionClicked={setcardActionClicked} title='Create Appointment' description='click below to create appointment' buttonString='create Appt' uuid='apt1'/>
          </Grid>
          </Box>
          
          { operationcode === 3 ? 
          <Box sx={{ flexGrow: 1, width: 1000, height: 200, backgroundColor: 'bgs.main'}}>
          <form onSubmit={handleApptUpdate} onReset={resetApptUpdate}>
            <FormControl>
              <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
                <TextField value={id} name="id" label='appointment id' required sx={{mb: 2}} variant='filled' size='small' type='string' color='neutral'></TextField>
                <TextField value={mrn} name="mrn" label='patient mrn' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral'></TextField>
                <TextField value={doctor} name="Doctor" label='Doctor username' required sx={{mb: 1}} variant='filled' size='small' type='string' color='neutral'onChange={e => setDoctor(e.target.value)}></TextField>
              </Stack>
              <TextField value={formatDate(date)} required sx={{mb: 1}} min="2018-06-07T00:00" variant='outlined' size='medium' type="datetime-local" color='neutral' onChange={e => setDate(e.target.value)}></TextField>
              <Stack spacing={2} direction="row">
                <Button variant="contained" color='neutral' type="submit">Update Appointment</Button>
                <Button variant="contained" color='neutral' type="reset">Cancel</Button>
              </Stack>
            </FormControl>
          </form>
        </Box>  : 
          <div> </div>
          } 
          
          { operationcode === 4 ? 
          <div> {horizontalSteps}</div>
          :
          <div> </div>
          }

          <Box sx={{ flexGrow: 1, width: '100%', backgroundColor: 'bgs.main'}}>{tableAppt}</Box>
        </ThemeProvider>
      </Container>
  );
}

export default ManageAppt;