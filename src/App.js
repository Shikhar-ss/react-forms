import './App.css';
import React, {useState,useReducer} from 'react';

const formDataReducer = (state,event) =>{
  return {
    ...state,
    [event.name] : event.value
  }
}

function App() {
  const [ submitting, setSubmit] = useState(false);
  const [formData, submitFormAction] = useReducer(formDataReducer,{})
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    console.log("FORM_DATA_: ",formData)
    setTimeout(()=>{
      setSubmit(false)
    }, 3000)
  };

  const handleChange = (e) => {
    const isCheckBox = e.target.type === 'checkbox';
    submitFormAction({
      name : e.target.name,
      value: isCheckBox ? e.target.checked : e.target.value 
    })
  }

  return (
    <div className="wrapper">
      <h1>APPLES</h1>
      {submitting ? (<div>
        Form is submitting...
      </div>) : (<ul>
        {Object.entries(formData).map(([name,value]) => (
          <ul key={name}><strong>{name}</strong>: {value.toString()}</ul>
        ))}
      </ul>)}
      <form >
        <fieldset className="fieldset-wrapper">
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange}/>
          </label>
          <label>
            <p>DOB</p>
            <input name="DOB" onChange={handleChange}/>
          </label>
          <label>
            <p>City</p>
            <input name="CITY" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>
              Apples
            </p>
            <select name="apple" onChange={handleChange}>
              <option value="">--Please select apple--</option>
              <option value="garwhali">Gharwali</option>
              <option value="desi">Desi</option>
              <option value="kashmiri">Kashmiri</option>
            </select>
          </label>
          <label>
           <p>Count</p>
           <input type="number" name="count" onChange={handleChange} step="1"/>
         </label>
         <label>
           <p>Gift Wrap</p>
           <input type="checkbox" name="gift-wrap" onChange={handleChange} />
         </label>
        </fieldset>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
