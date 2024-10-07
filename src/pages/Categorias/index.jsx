import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../../config/Api';
import Messages from '../../components/Messages';
import Layout from '../../layouts/Layout'
import { FormControl } from 'react-bootstrap';
import useDebounce from '../../components/useDebounce';
function Categorias () {

    const navigate = useNavigate(); 
    const[lista, setLista] = useState([])
    const[pesquisa, setPesquisa] = useState('');
    const debouncedPesquisa = useDebounce(pesquisa, 500); // 500ms delay

    function editarItem(valor) {
        navigate('/categorias/editar/'+valor);
    }
   
    async function getList() {
        const response = await Api.get('categorias?pesquisa='+pesquisa)
        setLista(response.data)
    }

    async function deleteItem(id) {
        Messages.confirmation('Deseja deletar esta categoria?', async () => {
            await Api.delete('categorias/' +id)
            Messages.success("Categoria removida com sucesso!")
            getList()
        })
    }
    
    useEffect(() => {
        getList()
    }, [debouncedPesquisa])

    return (
        <Layout>
            <h1>Categorias</h1>
            <Link to="/categorias/novo" className='btn btn-success btn-sm'>
                Nova Categoria
            </Link>
            <div className='mt-3'>
                <FormControl 
                    placeholder='Pesquisa' 
                    value={pesquisa} 
                    onChange={e => setPesquisa(e.target.value)} 
                />
            </div>
            <p>Listagem de Categorias</p>
           
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item, indice) => (
                        <tr key={indice}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
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

export default Categorias;