import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BaseURL, userListURL, userRegisterURL, userUpdateURL } from '../config';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';

const Userlist = () => {
    const states = [{ id: 1, label: 'Chhattisgarh' },
    { id: 2, label: 'Maharashtra' },
    { id: 3, label: 'Madhya Pradesh' },];


    const [allUserList, setAllUserList] = useState([]);

    useEffect(() => {
        handleUserList();
        handlemapList();
    }, [])
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const handlemapList = async () => {

        await axios.get('http://localhost:8000/api/gmap').then((response) => {
            console.log('asd', response);
        })
    }

    const handleUserList = () => {
        axios.get(userListURL).then((response) => {

            setAllUserList(response.data.data);
        })
            .catch((error) => {
                toast.error('Something went ');
            });
    }
    const [inputs, setInputs] = useState({

        'name': '',
        'email': '',
        'mobile': '',
        'gender': '',
        'description': '',
        'state': '',
        'password': '',

    });
    const handleShowCreate = () => {
        setShowCreate(true)
        setInputs([]);
    }
    const handleCreateClose = () => {
        setShowCreate(false)
    }

    const handleShow = (user) => {
        setShow(true)
        setInputs(user)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();

        // console.log(inputs);
        try {
            await axios.post(userUpdateURL, inputs).then((response) => {
                // console.log(response);
                toast.success(response.data.msg)
                handleUserList();
                handlemapList();
                setShow(false)
            });
        } catch (error) {
            // console.log(error);
            toast.error('something went wrong');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(userRegisterURL, inputs).then((response) => {
                // console.log(response);
                if(response.data.status === 1){
                    toast.success(response.data.msg)
                     
                }else if(response.data.status === 0){
                     toast.warn(response.data.msg)
                }
                handleUserList();
                handlemapList();
                setShowCreate(false)
            });
        } catch (error) {
            // console.log(error);
            toast.error(error);
        }
    }

    const handleDelete = async(id) => {
        try {
            await axios.get(`${BaseURL}/delete_user/${id}`).then((response) => {
                toast.success(response.data.msg)
                handleUserList();
                handlemapList();
            })
        } catch (error) {
            toast.error('something went wrong');
        }
    }
    return (
        <>
            <div className='container my-5'>
                <div className='text-center p-2 bg-dark text-white'>
                    <h4 className='text-white'>Register all user list</h4>
                    <button className='btn btn-success mx-1 my-2' onClick={() => handleShowCreate()}>New User Create</button>
                </div>
                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">MOBILE</th>
                            <th scope="col">Password</th>
                            <th scope="col">State</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>

                        {allUserList && allUserList.map((user, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.password}</td>
                                <td>{user.state}</td>
                                <td>{user.gender}</td>
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        <button className='btn btn-info text-white mx-1' onClick={() => handleShow(user)}>Edit</button>
                                        <button className='btn btn-danger text-white mx-1' onClick={() => handleDelete(user._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="card">
                                <h5 className="card-header text-center">Edit Student Data</h5>
                                <div className="card-body">
                                    <form onSubmit={handleSubmitUpdate}>
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
                                                type='password'
                                                name='password'
                                                value={inputs.password}
                                                onChange={handleChange}
                                                placeholder='Password' />
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
                                            <label className='form-group'> <h5>State</h5></label>
                                            <select className='form-control'
                                                required
                                                onChange={handleChange}
                                                name='state'
                                                value={inputs.state}
                                                selected={inputs.state} >
                                                <option value=''>select</option>
                                                {states.map((state) => (
                                                    <option value={state.id}>{state.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='my-2'>
                                            <textarea className='form-control'
                                                required
                                                name='description'
                                                onChange={handleChange}
                                                value={inputs.description} />
                                        </div>

                                        <div className='my-2'>
                                            <label className='form-group'> <h5>Gender</h5></label>
                                            <div className='form-group'>
                                                <input className=''
                                                    type="radio"
                                                    id="male"
                                                    value='male'
                                                    checked={inputs.gender === 'male'}
                                                    name='gender'
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="male" >Male</label>
                                            </div>
                                            <div className='form-group'>
                                                <input className=''
                                                    type="radio"
                                                    id="female"
                                                    value='female'
                                                    checked={inputs.gender === 'female'}
                                                    name='gender'
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="female" >Female</label>
                                            </div>
                                        </div>
                                        <button type='submit' class="btn btn-primary mt-3">Updaate Student</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={showCreate} onHide={handleCreateClose}>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="card">
                                <h5 className="card-header text-center">Create Student</h5>
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
                                                type='password'
                                                name='password'
                                                value={inputs.password}
                                                onChange={handleChange}
                                                placeholder='Password' />
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
                                            <label className='form-group'> <h5>State</h5></label>
                                            <select className='form-control'
                                                required
                                                onChange={handleChange}
                                                name='state'
                                                value={inputs.state}
                                                selected={inputs.state} >
                                                <option value=''>select</option>
                                                {states.map((state) => (
                                                    <option value={state.id}>{state.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='my-2'>
                                            <textarea className='form-control'
                                                required
                                                name='description'
                                                onChange={handleChange}
                                                value={inputs.description} />
                                        </div>

                                        <div className='my-2'>
                                            <label className='form-group'> <h5>Gender</h5></label>
                                            <div className='form-group'>
                                                <input className=''
                                                    type="radio"
                                                    id="male"
                                                    value='male'
                                                    checked={inputs.gender === 'male'}
                                                    name='gender'
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="male" >Male</label>
                                            </div>
                                            <div className='form-group'>
                                                <input className=''
                                                    type="radio"
                                                    id="female"
                                                    value='female'
                                                    checked={inputs.gender === 'female'}
                                                    name='gender'
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="female" >Female</label>
                                            </div>
                                        </div>
                                        <button type='submit' class="btn btn-primary mt-3">Create Student</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Userlist