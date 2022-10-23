import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from "react";

function FoodForm() {

  const globalPantry:any = localStorage.getItem("Pantry")
  const [isPantryEmpty, setIsPantryEmpty] = useState(Boolean);
  const [startDate, setStartDate] = useState(new Date());

  const validationSchema = Yup.object().shape({
    Food: Yup.string().required("Food is required"),
    Brand: Yup.string().required("Brand is required"),
    Quantity: Yup.string().required("Quantity is required"),
    Expiry: Yup.date().required("Expiry is required"),
    });
    
    const initialValues = {
      Food: "",
      Brand: "",
      Quantity: "",
      Expiry: "",
      Date_Added: new Date().toDateString()
    };

    const postData = (data: Object) => {
      fetch(`/api`, {
       'method':'POST',
        headers : {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(response => response.json())
      .catch(error => console.log(error))
    }
    
    const submitForm = (values:object) => {
      if (isPantryEmpty) {
        localStorage.setItem("Pantry", JSON.stringify([values]));
        setIsPantryEmpty(false)
      } else {
        const pantry:any= localStorage.getItem("Pantry")
        const updatedPantry = JSON.parse(pantry)
        updatedPantry.push(values);
        localStorage.setItem("Pantry", JSON.stringify(updatedPantry));
        postData(updatedPantry)
        }
      }
      
      useEffect(() => {
        (globalPantry === 'Empty') ? setIsPantryEmpty(true) : setIsPantryEmpty(false)
      }, [globalPantry, isPantryEmpty])
      
    // Use this to reset the pantry. 
    useEffect(() => {
          localStorage.setItem("Pantry", "Empty")
        },[]) 

  return (
        <Formik
          initialValues={initialValues}
          onSubmit={submitForm}
          validationSchema={validationSchema}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,
              handleBlur,
            } = formik;
            return (
                <div className="container">
                  <h1>Catelog your food</h1>
                  <Form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="Food">Food</label>
                      <Field
                        type="Food"
                        name="Food"
                        id="Food"
                        value={values.Food}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Pasta"
                      />
                      <ErrorMessage name="Food" component="span" />
                    </div>
    
                    <div className="form-row">
                      <label htmlFor="Brand">Brand</label>
                      <Field
                        type="Brand"
                        name="Brand"
                        id="Brand"
                        value={values.Brand}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="San Remo"
                      />
                      <ErrorMessage name="Brand" component="span" />
                    </div>
    
                    <div className="form-row">
                      <label htmlFor="Quantity">Quantity</label>
                      <Field
                        type="Quantity"
                        name="Quantity"
                        id="Quantity"
                        value={values.Quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="500g"
                      />
                      <ErrorMessage name="Quantity" component="span" />
                    </div>
    
                    <div className="form-row">
                      <label htmlFor="Expiry">Expiry</label>
                      <DatePicker 
                        selected={startDate} 
                        onChange={(date) => {
                          if (date) {
                            values.Expiry = date.toDateString()
                          } else {
                            values.Expiry = startDate.toDateString()
                          }
                          setStartDate(date || startDate)
                          }} />
                      <ErrorMessage name="Expiry" component="span" />
                    </div>
    
                    <button type="submit">
                      Catelog
                    </button>
                  </Form>
                </div>
            );
          }}
        </Formik>
      );
    };

export default FoodForm
