import { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

function Menu() {

    const { logout } = useContext(AuthContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                <a className="navbar-brand" href="#">DigCollege</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Painel</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/produtos">Produtos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/categorias">Categorias</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/usuarios">Usuários</Link>
                    </li>
                    <li className="nav-item">
                        <a href="" onClick={() => logout()}  className="nav-link" aria-disabled="true">Sair</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </>
    )
}

export default Menu;