import React, { useEffect, useState } from 'react';



function App()  {
  const initialValues = {username:'', email:'', password:''};
  const[formValues,setFormValues]=useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const[isSubmit, setIsSubmit] =useState(false);

  const handleChange =(event)=>{
    const{name,value}= event.target;
    setFormValues({...formValues, [name]:value});
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }
  useEffect(()=>{
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues)
    }
  }, [formErrors]);
  const validate = (values)=>{
    const errors ={};
    const regex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/i;
    if(!values.username){
      errors.username = 'Enter the username';
    }
    if(!values.email){
      errors.email = 'Enter the valid email';
    }else if(!regex.test(values.email)){
      errors.email = ' This is not valid email';
    }
    if(!values.password){
      errors.password = 'Enter the password';
    }else if(values.password < 4){
      errors.password = ' 4 character must enter';
    }else if(values.password > 10){
      errors.password = ' less than 10 character must enter';
    }
    return errors;
  };








  return (
    


    <div className='container'> 
    <div className='row margin-auto'>
      {
        Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className='message success'>Sign in successfully</div>
          ):(

        <pre>{JSON.stringify(formValues, undefined , 2)}</pre>
        )
      }
     
      <form className='col-sm-6 mx-auto bg-slate-300 rounded-xl  m-12 p-7' onSubmit={handleSubmit}>

        <h2 className='text-xl font-bold text-center animate__animated animate__bounce'> Login Form</h2>
      <div className="mb-3 col-sm-12">
          <label  className="form-label">Username</label>
          <input 
          type="text" 
          name="username"
          className="form-control" 
          aria-describedby="emailHelp"
         value={formValues.username}
          onChange={handleChange} 
          />
           <p>{formErrors.username}</p>
        </div>
       
        <div className="mb-3 col-sm-12">
          <label className="form-label">Email address</label>
          <input 
          type="email" 
          name='email' 
          className="form-control" 
          aria-describedby="emailHelp"
          value={formValues.email}
          onChange={handleChange} 
          />
         <p>{formErrors.email}</p>
        </div>
        
        <div className="mb-3 col-sm-12">
          <label className="form-label ">Password</label>
          <input 
          type="password" 
          name='password' 
          className="form-control"
          value={formValues.password}
          onChange={handleChange} 
          /><p>{formErrors.password}</p>
        </div>
        
        
        <button type="submit" className="btn btn-primary text-black bg-white border-none">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default App;