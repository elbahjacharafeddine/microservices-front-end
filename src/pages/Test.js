import $ from 'jquery'; 
import DataTable from 'jquery'
import React,{Component} from "react";
import { ReactDOM } from 'react';
const { useState , useEffect } = React;

const Test = () => {

  const [users,setUsers] = useState([]);

  useEffect(() => {
    
    setTimeout(() => {
      $('#dataTablem').DataTable().destroy();
      setUsers([[0,"Vivek"],[1,"Darshita"]]);
      
      
    },2000);
    
  },[]);


  useEffect(() => {
    setTimeout(() => {
        $('#dataTablem').DataTable();
      
    },2000);
    
  },[]);

 

  return (
    <table class="table align-items-center table-flush table-hover" id="dataTablem" width="100%" cellSpacing="0">
    <thead>
        <tr>
            <th width="10%">Name</th>
        </tr>
    </thead>
    <tbody>
        {
            users.map(item => (
                    <tr key={item[0]}>
                        <td>{item[1]}</td>
                    </tr>))
        }
    </tbody>
    </table>
  );
}
$(document).ready(function() {
    $('#dataTablem').DataTable();
});
export default Test;