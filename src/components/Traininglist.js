import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addtraining from './Addtraining';

export default function Traininglist() {
  const [trainings, setTrainings] = useState ([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err));
  }

  const deleteTraining = (params) => {
    console.log(params)
    if (window.confirm('Are you sure you want to delete this training?')) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${params}`, {method: 'DELETE'})
      .then(() => fetchData())
      .catch(err => console.error(err));
    };
  };

  const saveTraining = (training) => {
    console.log("saveTraining " + training)
    fetch('https://customerrest.herokuapp.com/api/trainings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(training)
    })
    .then(response => fetchData())
    .catch(err => console.error(err))
  };

  const columns = [
    {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
    {headerName: 'Date', field: 'date', sortable: true, filter: true},
    {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
    {headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true},
    {headerName: 'Delete', cellRendererFramework: function(params) {
        return <Button size="small" variant="outlined" color="error"
        onClick={() => deleteTraining(params.data.id)}>Delete</Button>
    }},
    
  ];

  return (
    <div>
      <div className="ag-theme-material"
        style={{
          height: 1750,
          width: '100%',
          margin: 'auto',
        }}
        >
        <Addtraining saveTraining={saveTraining} />
        <AgGridReact
          animateRows={true}
          columnDefs={columns}
          rowData={trainings}
        >
        </AgGridReact>
      </div>      
    </div>
  )

};