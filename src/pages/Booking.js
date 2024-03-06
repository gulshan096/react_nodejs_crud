import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BaseURL, bookingListURL, createBookingURL, updateBookingURL, userListURL} from '../config';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';

const Booking = () => {
   
    const [allUserList, setAllUserList] = useState([]);
    const [bookingList, setAllBookingList] = useState([]);

    useEffect(() => {
        handleUserList();
        handlemapList();
        handleBookingList();
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

    const handleBookingList = () => {
        axios.get(bookingListURL).then((response) => {

            setAllBookingList(response.data.data);
        })
            .catch((error) => {
                toast.error('Something went ');
            });
    }
    const [inputs, setInputs] = useState({

        'userid': '',
        'car_name': '',
        'brand_name': '',
        'description': '',
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
            await axios.post(updateBookingURL, inputs).then((response) => {
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
            await axios.post(createBookingURL, inputs).then((response) => {
                // console.log(response);
                if (response.data.status === 1) {
                    toast.success(response.data.msg)

                } else if (response.data.status === 0) {
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

    const handleDelete = async (id) => {
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
                    <h4 className='text-white'>All Booking List</h4>
                    <button className='btn btn-success mx-1 my-2' onClick={() => handleShowCreate()}> Create New Booking</button>
                </div>
                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">User id</th>
                            <th scope="col">Car name</th>
                            <th scope="col">Brand name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>

                        {bookingList && bookingList.map((book, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{book.userid}</td>
                                <td>{book.car_name}</td>
                                <td>{book.brand_name}</td>
                                <td>{book.description}</td>
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        <button className='btn btn-info text-white mx-1' onClick={() => handleShow(book)}>Edit</button>
                                        <button className='btn btn-danger text-white mx-1' onClick={() => handleDelete(book._id)}>Delete</button>
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
                                <h5 className="card-header text-center">Edit Booking</h5>
                                <div className="card-body">
                                    <form onSubmit={handleSubmitUpdate}>
                                        <div className='my-2'>
                                            <input className='form-control'
                                                required
                                                type='text'
                                                name='car_name'
                                                value={inputs.car_name}
                                                onChange={handleChange}
                                                placeholder='Car name' />
                                        </div>
                                        <div className='my-2'>
                                            <input className='form-control'
                                                required
                                                type='text'
                                                name='brand_name'
                                                value={inputs.brand_name}
                                                onChange={handleChange}
                                                placeholder='Brand name' />
                                        </div>
                                        <div className='my-2'>
                                            <label className='form-group'> <h5>Tenant</h5></label>
                                            <select className='form-control'
                                                required
                                                onChange={handleChange}
                                                name='userid'
                                                value={inputs.userid}
                                                selected={inputs.userid} >
                                                <option value=''>select</option>

                                                {allUserList && allUserList.map((user, index) => (
                                                    <option value={user._id}>{user.name}</option>
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
                                        <button type='submit' class="btn btn-primary mt-3">Updaate Booking</button>
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
                                <h5 className="card-header text-center">Create Booking</h5>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className='my-2'>
                                            <label className='form-group'> <h5>State</h5></label>
                                            <select className='form-control'
                                                required
                                                onChange={handleChange}
                                                name='userid'
                                                value={inputs.userid}
                                                selected={inputs.userid} >
                                                <option value=''>select</option>
                                                {allUserList && allUserList.map((user, index) => (
                                                    <option value={user._id}>{user.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='my-2'>
                                            <input className='form-control'
                                                required
                                                type='text'
                                                name='car_name'
                                                value={inputs.car_name}
                                                onChange={handleChange}
                                                placeholder='Car name' />
                                        </div>
                                        <div className='my-2'>
                                            <input className='form-control'
                                                required
                                                type='text'
                                                name='brand_name'
                                                value={inputs.brand_name}
                                                onChange={handleChange}
                                                placeholder='Brand name' />
                                        </div>
                                        <div className='my-2'>
                                            <textarea className='form-control'
                                                required
                                                name='description'
                                                onChange={handleChange}
                                                value={inputs.description} />
                                        </div>
                                        <button type='submit' class="btn btn-primary mt-3">Create Booking</button>
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

export default Booking