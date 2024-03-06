import axios from 'axios';
import React, { useState } from 'react'
import { phonepePaymentURL } from '../config';
// import { Navigate } from 'react-router-dom';

const PhonepeForm = () => {
    const [inputs, setInputs] = useState({
        'name': '',
        'email': '',
        'mobile': '',
        'amount': ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    // const navigate = Navigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //    console.log(inputs);
            await axios.post(phonepePaymentURL, inputs).then((response) => {
                window.location.href = response.data

            });
        } catch (error) {

            console.log(error);
        }


    }

    return (
        <>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-md-6  mx-auto'>
                        <div className="card">
                            <h5 className="card-header text-white text-center" style={{ backgroundColor: 'purple' }}>Phonepe Payment Gateway</h5>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='my-2'>
                                        <input className='form-control'
                                            required
                                            type='text'
                                            name='name'
                                            value={inputs.name}
                                            onChange={handleChange}
                                            placeholder='Student name' />
                                    </div>
                                    <div className='my-2'>
                                        <input className='form-control'
                                            required
                                            type='email'
                                            name='email'
                                            value={inputs.email}
                                            onChange={handleChange}
                                            placeholder='Student Email' />
                                    </div>
                                    <div className='my-2'>
                                        <input className='form-control'
                                            required
                                            type='text'
                                            name='mobile'
                                            value={inputs.mobile}
                                            onChange={handleChange}
                                            placeholder='Student Mobile' />
                                    </div>
                                    <div className='my-2'>
                                        <input className='form-control'
                                            required
                                            type='text'
                                            name='amount'
                                            value={inputs.amount}
                                            onChange={handleChange}
                                            placeholder='Amount' />
                                    </div>
                                    <button type='submit' class="btn btn-primary" style={{ backgroundColor: 'purple' }}>Phonepe Pay</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PhonepeForm