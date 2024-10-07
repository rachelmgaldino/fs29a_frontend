import { Link, useNavigate } from "react-router-dom"
import Layout from "../../layouts/Layout"
import { useEffect, useState } from "react";
import useDebounce from "../../components/useDebounce";
import { FormControl } from "react-bootstrap";
import Api from "../../config/Api";
import Messages from "../../components/Messages";

function UsuariosIndex() {

    const navigate = useNavigate(); 
    const[lista, setLista] = useState([])
    const[pesquisa, setPesquisa] = useState('');
    const debouncedPesquisa = useDebounce(pesquisa, 500); // 500ms delay

    function editarItem(valor) {
        navigate('/usuarios/editar/'+valor);
    }

    async function getList() {
        const response = await Api.get('usuarios?pesquisa='+pesquisa)
        setLista(response.data)
    }

    async function deleteItem(id) {
        Messages.confirmation('Deseja deletar este usuario?', async () => {
            await Api.delete('usuarios/' +id)
            Messages.success("Usuarrio removido com sucesso!")
            getList()
        })
    }
    
    useEffect(() => {
        getList()
    }, [debouncedPesquisa])

    return (
        <Layout>
            <h1>Usuários</h1>
            <Link to={'/usuarios/novo'} className="btn btn-success btn-sm">
                Novo Usuário
            </Link>
            <div className='mt-3'>
                <FormControl
                    placeholder='Pesquisa' 
                    value={pesquisa} 
                    onChange={e => setPesquisa(e.target.value)} 
                />
            </div>
            <p>Listagem de Usuarios</p>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item, indice) => (
                        <tr key={indice}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.login}</td>
                            <td>
                                <button onClick={() => editarItem(item.id)} className='btn btn-primary'>Editar</button>
                
                                <button className='btn btn-danger' onClick={() => deleteItem(item.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default UsuariosIndex