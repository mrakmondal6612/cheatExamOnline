import React, { useEffect, useState } from 'react';
import { Button, Stepper, Step, StepLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { toast } from 'react-toastify'
import './GenerateAPIForm.css'
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export default function GenerateAPIForm(){
  return (
    <div className="api_popup">
      <div className="api_key_box">
        <StepForm/>
      </div>
    </div>
  )
}

const StepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dropdownValue, setDropdownValue] = useState('');
  const steps = ['Step 1', 'Step 2', 'Step 3'];
  const [selectedPlan, setSelectedPlan] = useState({})
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState('');
  const { authorizationToken, BACKEND_HOSTING_URL, user } = useAuth()
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])

  const getAllPlans = async () => {
    try {
      const response = await fetch(`${BACKEND_HOSTING_URL}/api/api_key/get_all_plans`, {
        method: 'GET',
        headers: {
            Authorization: authorizationToken,
        },
      })
  
      setPlans(await response.json())
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPlans()
  }, [])

  const handleNext = async () => {
    if(selectedPlan.speed && steps.length - 1 !== activeStep){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }else if (steps.length - 1 === activeStep){
      // console.log(selectedPlan);
      // console.log(startDate, endDate);
      
      try {
        if(user.creaditPoints>=selectedPlan.coins){
          const response = await fetch(`${BACKEND_HOSTING_URL}/api/api_key/get_api_key`, {
            method: 'POST',
            headers: {
                Authorization: authorizationToken,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(
              {
                email: user.email,
                duration: selectedPlan.duration,
                speed: selectedPlan.speed,
                startDate: startDate,
                coins: selectedPlan.coins
              }
            )
          })
          const data = await response.json()
          console.log(data);
          
          if(response.ok){
            toast.success('Activation key Generated Successfully')
            navigate('/pricing')
          }else{
            toast.error('Activation key Generation Failed')
          }
        }else{
          toast.error("You don't have Sufficient Coins")
          navigate('/buy_coins')
        }
      } catch (error) {
        console.log(error);
      }
    }
    else{
      toast.error('Please Choose a plan First')
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStartDate("")
    setEndDate('')
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
    setSelectedPlan(plans[event.target.value])
    console.log(event.target.value);
  };

  const handleStartDateChange = (e) => {
    // const start = new Date(e.target.value);
    // setStartDate(start);

    // const end = new Date(start);
    // end.setDate(end.getDate() + selectedPlan.duration.days);
    // end.setHours(end.getHours() + selectedPlan.duration.hours);

    // setEndDate(end.toISOString().split('T')[0]);
    const start = new Date(e.target.value);
      setStartDate(start);

      if (!isNaN(start.getTime())) { // Check if the date is valid
         const end = new Date(start);
         const now = new Date()
         end.setDate(end.getDate() + selectedPlan.duration.days);
         end.setHours(end.getHours() + selectedPlan.duration.hours);
         end.setMinutes(now.getMinutes())
         end.setSeconds(now.getSeconds())
         end.setMilliseconds(now.getMilliseconds())

         setEndDate(end.toISOString().split('T')[0]);
      }
 };


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="step_box">
            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Choose a Plan</InputLabel>
              <Select
                labelId="dropdown-label"
                value={dropdownValue}
                onChange={handleDropdownChange}
              >
                {
                  plans.map((plan, index) => {
                    return <MenuItem value={index} key={index}>validity {plan.duration.days} days {plan.duration.hours} hours {plan.speed} speed, with {plan.coins} coins</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </div>
        );
      case 1:
        return (
          <div className="step_box step2_page">
            <div className="total_coins">
              <h3>{selectedPlan.coins} coins 🪙</h3>
            </div>
            <div className="descrption">
              <p>{selectedPlan.details}</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step_box select_date">
            <div className="select_start_date">
                <label htmlFor="start_date">Start Date : </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={handleStartDateChange}
                />
            </div>
            <div className="end_date">
                <label htmlFor="end_date">End Date : </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  value={endDate}
                  disabled
                />
            </div>
          </div>
        );
      default:
        return (
          <div className="step_box"></div>
        );
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep)}
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Generate' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};
