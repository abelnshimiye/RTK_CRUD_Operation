import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify"
import "./Home.css";
import { useContactsQuery, useDeleteContactMutation } from '../services/contactApiSlice';

const Home = () => {
  const {data, isLoading, isSuccess, isFetching, error} = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation()

  useEffect(()=> {
    if (error){
      toast.error("Something went wrong")
    }
  },[error]);


  const handleDelete = async(id : any) => {
    if (window.confirm("Are you sure you want to delete that contact ? ")){
      await deleteContact(id);
      toast.success("Contact Deleted Successfully");
    }
  }


  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{marginTop: "100px"}}>
      <Link to="/addContact">
        <button className='btn btn-add'>Add Contact</button>
      </Link>
      <br />
      <br />
      <table className='styled-table'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.contact}</td>
              <td>
                <Link to={`/edit/${contact.id}`}>
                  <button className='btn btn-edit'>Edit</button>
                </Link>
                {/* onClick={() => deleteContact(contact.id)} */}
                <button className='btn btn-delete' onClick={()=> handleDelete(contact.id)} >Delete</button>
                <Link to={`/info/${contact.id}`}>
                <button className='btn btn-view'>View</button>
                </Link>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Home
