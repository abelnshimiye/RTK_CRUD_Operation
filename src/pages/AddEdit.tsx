import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import "./AddEdit.css";
import { useAddContactMutation, useContactQuery, useUpdateContactMutation } from '../services/contactApiSlice';

const initialState = {
  name: "",
  email: "",
  contact: ""
}

const AddEdit = () => {

  const [formValue, setFormValue] =  useState(initialState);
  const {name, email, contact} =  formValue;
  const [editMode, setEditMode] = useState(false);

  

  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const navigate = useNavigate();

  const {id} =  useParams();
  const {data, error} = useContactQuery(id!)

  useEffect(()=> {
    if (error){
      toast.error("Something went wrong")
    }
  },[error]);

  useEffect(()=> {
    if (id){
      setEditMode(true);
      if (data){
        setFormValue({...data})
      }
    }else{
      setEditMode(false);
      setFormValue({...initialState});
    }
  },[id, data]);




  const handleInputChange = (e: any) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  };

  
  const handleSubmit = async(e: any) => {
    e.preventDefault();
   if(!name && !email && !contact) {
    toast.error("Please provide value into each input field ")
   }else {
    if(!editMode){
      await addContact (formValue);
      navigate("/");
      toast.success("Contact Added Successfully added"); 
    }else{
      await updateContact(formValue);
      navigate("/");
      setEditMode(false);
      toast.success("Contact Updated Successfully");
    }   
  }
  }
  
  return (
    <div style={{marginTop: "100px"}}>

      <form style={{margin: "auto", padding:"15px", maxWidth: "400px", alignContent: "center",}} onSubmit={handleSubmit }>

        <label htmlFor='name' >Name</label>
        <input
        type='text'
        id='name'
        name='name'
        placeholder='Enter Name ....'
        value={name}
        onChange={handleInputChange}
        />

        <label htmlFor='email' >Email</label>
        <input
        type='email'
        id='email'
        name='email'
        placeholder='Enter email ....'
        value={email}
        onChange={handleInputChange}
        />

        <label htmlFor='contact' >Contact</label>
        <input
        type='number'
        id='contact'
        name='contact'
        placeholder='Enter Contact ....'
        value={contact}
        onChange={handleInputChange}
        />

<input type='submit' value={editMode ? "update" : "Add"}/>


      </form>
      
      
    </div>
  )
}

export default AddEdit
