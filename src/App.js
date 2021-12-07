import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

function App() {
  const [value, setValue] = React.useState('1');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor:'ButtonHighlight' }}>
            <TabList onChange={handleChange} centered>
              <Tab label="Trainings" value="1" />
              <Tab label="Customers" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><Traininglist /></TabPanel>
          <TabPanel value="2"><Customerlist /></TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
