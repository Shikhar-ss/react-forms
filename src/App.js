import './App.css';
import React, {useState,useReducer} from 'react';

const formDataReducer = (state,event) =>{
  if(event.reset) {
    return {
      name: '',
      DOB: '',
      CITY: '',
      apple: '',
      count: '',
      'gift-wrap': false
    }
  }
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
      submitFormAction({reset:true})
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
        <fieldset disabled={submitting} className="fieldset-wrapper">
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange} value={formData.name || ''} />
          </label>
          <label>
            <p>DOB</p>
            <input name="DOB" onChange={handleChange} value={formData.DOB || ''}/>
          </label>
          <label>
            <p>City</p>
            <input name="CITY" onChange={handleChange} value={formData.CITY || ''}/>
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
          <label>
            <p>
              Apples
            </p>
            <select name="apple" onChange={handleChange} value={formData.apple || ''}>
              <option value="">--Please select apple--</option>
              <option value="garwhali">Gharwali</option>
              <option value="desi">Desi</option>
              <option value="kashmiri">Kashmiri</option>
            </select>
          </label>
          <label>
           <p>Count</p>
           <input type="number" name="count" onChange={handleChange} value={formData.count || ''} step="1"/>
         </label>
         <label>
           <p>Gift Wrap</p>
           <input type="checkbox" disabled={formData.apple !== 'desi'} name="gift-wrap" onChange={handleChange} checked={formData['gift-wrap'] || false}/>
         </label>
        </fieldset>
        <button type="submit" disabled={submitting}onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
