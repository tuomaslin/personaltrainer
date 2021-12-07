import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';

export default function Customerlist() {
  const [customers, setCustomers] = useState ([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err));
  }

  const deleteCustomer = (params) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      fetch(params, {method: 'DELETE'})
      .then(() => fetchData())
      .catch(err => console.error(err));
    };
  };

  const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
    })
    .then(response => fetchData())
    .catch(err => console.error(err))
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
  };

  const columns = [
    {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
    {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
    {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true},
    {headerName: 'City', field: 'city', sortable: true, filter: true},
    {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
    {headerName: 'Edit', cellRendererFramework: function(params) {
      return <Editcustomer updateCustomer={updateCustomer} customer={params.data} />
    }},
    {headerName: 'Delete', cellRendererFramework: function(params) {
      return <Button size="small" variant="outlined" color="error"
      onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>
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
        <Addcustomer saveCustomer={saveCustomer} />
        <AgGridReact
          animateRows={true}
          columnDefs={columns}
          rowData={customers}
        >
        </AgGridReact>
      </div>      
    </div>
  )

}