import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts/Layout"
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { ErrorMessage, Formik } from "formik";
import { Button, FormControl } from "react-bootstrap";
import Api from "../../config/Api";
import Messages from "../../components/Messages";

function UsuariosForm() {

    const navigate = useNavigate();
    const params = useParams();
    const[dataForm, setDataForm] = useState({
        name: '',
        login: '',
        password: ''
    })

    async function handleSave(values) {
        if(params.id) {
            // EDITANDO CATEGORIA
            await Api.put('usuarios/'+params.id, values)
            Messages.success("Usuario atualizado com sucesso.")
            navigate('/usuarios')
        } else {
            await Api.post('usuarios', values)
            Messages.success("Usuario criado com sucesso.")
            navigate('/usuarios')
        }
    }

    async function getData(){
        const response = await Api.get('usuarios/'+params.id)
        setDataForm(response.data)
    }

    const validacaoForm = Yup.object({
        name: Yup.string().required("Campo obrigatório.").min(3, 'O minimo de 3 caracteres'),
        login: Yup.string().required("Campo obrigatório.").min(3, 'O minimo de 3 caracteres'),
        // password: Yup.string().required("Campo obrigatório.").min(3, 'O minimo de 3 caracteres'),
    })

    useEffect(() => {
        if(params.id) {
            getData()
        }
    }, [])

    return (
        <Layout>
            Formulário de Usuario
            <Formik
                enableReinitialize={true}
                initialValues={dataForm}
                onSubmit={(values) => {
                    handleSave(values)
                }}
                validationSchema={validacaoForm}
            >
                {({ handleChange, values, handleSubmit }) => (
                    <>
                        <div className="mb-3">
                            <label>Nome</label>
                            <FormControl
                                id="name"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                            />
                            <div className="error" >
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Login</label>
                            <FormControl 
                                id="login"
                                name="login"
                                placeholder="Login"
                                onChange={handleChange}
                                value={values.login}
                            />
                            <div className="error" >
                                <ErrorMessage name="login" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Senha</label>
                            <FormControl 
                                id="password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                value={values.password}
                            />
                            <div className="error" >
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <Button variant="success" onClick={handleSubmit}>Salvar</Button>
                    </>
                )}
            </Formik>
        </Layout>
    )
}

export default UsuariosForm