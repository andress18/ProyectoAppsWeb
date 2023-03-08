import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import { getUsers } from 'services/userService';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const redirect = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: function (values) {
            const userExists = users.filter(u => u.username === values.username && u.password === values.password);
            if (userExists.length > 0)
                redirect("/todos")
            else
                alert("username o contraseña incorrecta")
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required(),
            password: Yup.string()
                .required(),
        })
    });
    const [users, setUsers] = useState([])
    const fetchData = useCallback(async () => {
        let usersApi = await getUsers();
        setUsers(usersApi);
    }, []);

    useEffect(() => {
        fetchData().catch();
    }, [fetchData]);


    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <form onSubmit={formik.handleSubmit}>
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                                <h2 className="fw-bold mb-2 text-center">Bienvenido</h2>
                                <p className="text-white-50 mb-3">Por favor ingrese su usuario y contraseña!</p>

                                {/* <MDBInput wrapperClass='mb-4 w-100' label='Username' id='formControlLg' type='email' size="lg" /> */}
                                <div className='mb-4'>
                                    <MDBInput type="text" name="username" id="username" label="Username" wrapperClass='w-100'
                                        className={`${formik.touched.username && formik.errors.username ? 'border-danger' : 'border-gray-300'}`}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                                    {formik.touched.username && formik.errors.username && (
                                        <span className='text-danger'>{formik.errors.username}</span>
                                    )}
                                </div>
                                <div className='mb-4'>
                                    <MDBInput type="password" name="password" id="password" label="Password" wrapperClass='w-100'
                                        className={`${formik.touched.password && formik.errors.password ? 'border-danger' : 'border-gray-300'}`}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                    {formik.touched.password && formik.errors.password && (
                                        <span className='text-danger'>{formik.errors.password}</span>
                                    )}
                                </div>
                                {/* <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" /> */}

                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                                <MDBBtn size='lg' type='submit'>
                                    Login
                                </MDBBtn>

                                <hr className="my-4" />

                                <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                                    <MDBIcon fab icon="google" className="mx-2" />
                                    Sign in with google
                                </MDBBtn>

                                <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                                    <MDBIcon fab icon="facebook-f" className="mx-2" />
                                    Sign in with facebook
                                </MDBBtn>

                            </MDBCardBody>
                        </MDBCard>
                    </form>
                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default Login;