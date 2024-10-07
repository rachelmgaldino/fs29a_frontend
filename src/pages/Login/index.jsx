import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import Swal from 'sweetalert2'
import Api from "../../config/Api";

function Login() {
    const { setLogado } = useContext(AuthContext);
    const [dataForm, setDataForm] = useState({
        login: '',
        senha: ''
    });

    function mudarCampos(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        // ESTRUTURACAO E DESESTRUTURACAO DE OBJETOS.
        setDataForm({...dataForm, [nome]: valor});
        // setDataForm()
    }

    async function logar() {
        const { login, senha } = dataForm

        const response = await Api.post('login', {
            login: login,
            password: senha
        })

        localStorage.setItem('token@dc', response.data.token)
        Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: response.data.message,
        });
        setLogado(true)
    }


    return (
        <div className="container">
            <div className="row">
                <div className="mt-5 col-md-4 offset-md-4">
                    <div className="mt-5 d-flex justify-content-center">
                        <img src="https://th.bing.com/th/id/R.3c7f673d7255caba3fe8c9014d2ec2c4?rik=1YjvUp1VIYwFAA&pid=ImgRaw&r=0" width={'60%'} alt="" />
                    </div>
                    <form className="mt-4">
                        <div>
                            {/* {JSON.stringify(dataForm)} <br /> */}
                            <label htmlFor="">Login</label>
                            {/* <input onChange={evento => setLogin(evento.target.value)} type="text" className="form-control" name="login" id="" /> */}
                            <input onChange={evento => mudarCampos(evento)} type="text" className="form-control" name="login" id="" />
                        </div>
                        <div className="mt-3">
          
                            <label htmlFor="">Senha</label>
                            {/* <input onChange={evento => setSenha(evento.target.value)} type="password" className="form-control" name="senha" id="" /> */}
                            <input onChange={evento => mudarCampos(evento)} type="password" className="form-control" name="senha" id="" />
                        </div> 
                        <div className="mt-3">
                            <button onClick={logar} type="button" className="btn btn-primary btn-sm">Acessar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;