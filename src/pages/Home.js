import { React, useState } from 'react'
import axios from 'axios';
import { userRegisterURL } from '../config';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faGithub } from '@fortawesome/free-brands-svg-icons'
import { } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    const [inputs, setInputs] = useState({
        'name': '',
        'email': '',
        'password': '',
    });

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(userRegisterURL, inputs).then((response) => {
                toast.success(response.data.msg)
            });
        } catch (error) {
            toast.error('something went wrong');
        }
    }

    return (
        <>

            <div className='container my-5'>
                <div className='row'>
                    <div className='col-md-4  mx-auto'>
                        <div className="card">
                            <h5 className="card-header text-center">Create Account</h5>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='my-2'>
                                        <input className='form-control'
                                            required
                                            type='text'
                                            name='name'
                                            value={inputs.name}
                                            onChange={handleChange}
                                            placeholder='Username' />
                                    </div>
                                    <div className='my-2'>
                                        <input className='form-control'
                                            required
                                            type='email'
                                            name='email'
                                            value={inputs.email}
                                            onChange={handleChange}
                                            placeholder='Email' />
                                    </div>
                                    <div className='my-2'>
                                        <input className='form-control'
                                            required
                                            type='password'
                                            name='password'
                                            value={inputs.password}
                                            onChange={handleChange}
                                            placeholder='Password' />
                                    </div>
                                    <div className="text-center">
                                        <button type='submit' className="btn btn-lg btn-primary w-100">Signup</button>
                                    </div>

                                    <p className="text-center my-3">OR</p>
                                    <div className='text-center'>
                                        <button type='button' className="btn btn-lg btn-outline-light border border-dark my-2 text-dark w-100"><FontAwesomeIcon icon={faGoogle } className='text-primary ' /> Continue With Google</button>
                                    </div>
                                    <div className='text-center'>
                                        <button type='button' className="btn btn-lg btn-outline-light border border-dark my-2 text-dark w-100"> <FontAwesomeIcon icon={faGithub} /> Continue With Github</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home