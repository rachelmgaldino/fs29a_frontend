import Menu from "../../layouts/Menu";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, FormControl } from "react-bootstrap";
import Api from "../../config/Api";
import Messages from "../../components/Messages";
import { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";

function CategoriasForm () {
    
    const navigate = useNavigate();
    const params = useParams();
    const[dataForm, setDataForm] = useState({
        nome: '',
    })
    
    async function handleSave(values) {
        if(params.id) {
            // EDITANDO CATEGORIA
            await Api.put('categorias/'+params.id, values)
            Messages.success("Categoria atualizada com sucesso.")
            navigate('/categorias')
        } else {
            await Api.post('categorias', values)
            Messages.success("Categoria criada com sucesso.")
            navigate('/categorias')
        }
    }

    async function getData(){
        const response = await Api.get('categorias/'+params.id)
        setDataForm(response.data)
    }

    const validacaoForm = Yup.object({
        nome: Yup.string().required("Campo obrigatório.").min(3, 'O minimo de 3 caracteres'),
    })

    useEffect(() => {
        if(params.id) {
            getData()
        }
    }, [])

    return (
        <Layout>

           
            Formulário de Categoria
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
                            <FormControl 
                                id="nome"
                                name="nome"
                                onChange={handleChange}
                                value={values.nome}
                            />
                            <div className="error" >
                                <ErrorMessage name="nome" />
                            </div>
                        </div>
                        <Button variant="success" onClick={handleSubmit}>Salvar</Button>
                    </>
                )}
            </Formik>
        </Layout>
    )
}

export default CategoriasForm;