import React, { useCallback, useEffect, useState } from "react";
import * as Yup from 'yup';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { crearTarea, deleteTarea, getTareas, updateTarea } from "services/tareasService";

export default function Todo() {

    const formik = useFormik({
        initialValues: {
            titulo: '',
        },
        onSubmit: async function (values) {
            await crearTarea({ titulo: values.titulo, terminado: 0 });
            await fetchData();
            formik.values.titulo = "";
        },
        validationSchema: Yup.object({
            titulo: Yup.string()
                .required(),
        })
    });
    const [tareas, setTareas] = useState([])
    const fetchData = useCallback(async () => {
        let tareasApi = await getTareas();
        setTareas(tareasApi);
    }, []);

    useEffect(() => {
        fetchData().catch();
    }, [fetchData]);

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="d-flex justify-content-center align-items-center">
                    <MDBCol lg="9" xl="7">
                        <MDBCard className="rounded-3">
                            <MDBCardBody className="p-4">
                                <h4 className="text-center my-3 pb-3">To Do App</h4>
                                <form onSubmit={formik.handleSubmit}>
                                    <MDBContainer>
                                        <MDBCardBody className="p-4">
                                            <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                                <MDBCol size="12">
                                                    <MDBInput type="text" name="titulo" id="titulo" label="Ingrese una tarea aquí" wrapperClass='w-100'
                                                        className={`${formik.touched.titulo && formik.errors.titulo ? 'border-danger' : 'border-gray-300'}`}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.titulo} />
                                                    {formik.touched.titulo && formik.errors.titulo && (
                                                        <span className='text-danger'>{"campo requerido"}</span>
                                                    )}
                                                </MDBCol>
                                                <MDBCol size="12">
                                                    <MDBBtn type="submit">Guardar</MDBBtn>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBContainer>
                                </form>
                                <MDBTable className="mb-4">
                                    <MDBTableHead>
                                        <tr>
                                            <th scope="col">Todo item</th>
                                            <th scope="col">Terminada</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {tareas?.map(t =>
                                            <tr key={t}>
                                                <td>{t.titulo}</td>
                                                <td>{t.terminado === 1 ? "Sí" : "No"}</td>
                                                <td>
                                                    <MDBBtn type="submit" color="danger" onClick={async () => {
                                                        await deleteTarea(t);
                                                        await fetchData()
                                                    }}>
                                                        Eliminar
                                                    </MDBBtn>

                                                    <MDBBtn type="submit" color="success" className="ms-1" onClick={async () => {
                                                        await updateTarea({ titulo: t.titulo, terminado: !t.terminado });
                                                        await fetchData()
                                                    }}>
                                                        Cambiar estado terminada
                                                    </MDBBtn>
                                                </td>
                                            </tr>
                                        )}

                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section >
    );
}