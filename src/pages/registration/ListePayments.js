import React from 'react'
import { useState } from 'react'
import RegistrationService from '../../services/RegistrationService'
import DataTable from 'react-data-table-component'
import { useEffect } from 'react'
const ListePayments = () => {
    const [registrations,setRegistrations] =useState([]);
    const [search,setSearch] =useState("");
    const [filtredRegistrations,setFiltredRegistrations] =useState([]);
    const getRegistrations=()=>{
        RegistrationService.getRegistrations().then((res) => {
            setRegistrations(res.data);
            setFiltredRegistrations(res.data);
       });
    }

    const columns =[
        {
            name:"id",
            selector:(row) =>row.id,
        },{
            name:"first_name",
            selector:(row) =>row.first_name,
            sortable:true,
        },
        {
            name:"last_name",
            selector:(row) =>row.last_name,
            sortable:true,

        },
        {
            name:"university",
            selector:(row) =>row.university,
            sortable:true,
        }
        ,
        {
            name:"amount",
            selector:(row) =>row.amount,
            sortable:true,
        },
    ];

    useEffect(()=>{
        getRegistrations();
    }, []);

    useEffect(()=>{
       const result = registrations.filter(registration => {
        return registration.last_name.toLowerCase().match(search.toLowerCase()) || registration.first_name.toLowerCase().match(search.toLowerCase())
        || registration.university.toLowerCase().match(search.toLowerCase())
        ;
       });

       setFiltredRegistrations(result);
    }, [search]);


    return <DataTable columns={columns} data={filtredRegistrations}
     pagination
     fixedHeader
     fixedHeaderScrollHeight='450px'
     highlightOnHover
     subHeader
     subHeaderComponent={
        <input 
         type="text"
         placeholder="Search here" 
         className='w-25 form-control'
         value={search}
         onChange={ (e) => setSearch(e.target.value)}
         />
     }
     
     
     
     
     />;


//   return (
//     <div>ListePayments</div>
//   )
}

export default ListePayments