import Menu from "./Menu";

function Layout({ children }) {
    return (
        <>
            <Menu />
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default Layout;