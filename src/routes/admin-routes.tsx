import { Route } from "react-router-dom";
import AdminLayout from "../layouts/admin-layout/admin-layout";
import ListaUsuarios from "../features/usuarios/components/cadastro-usuarios/lista-usuarios";
/*import Calendario from "../features/usuarios/components/calendar/calendario";*/
import { CalendarOutlined, HeartOutlined, HomeOutlined, LogoutOutlined, UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import NotFoundRedirect from "./not-found-redirect";
import { Logout } from "../features/auth/logout";
/*import ListaProfissionais from "../features/profissionais/components/lista-profissionais/lista-profissionais";*/
import ListaProdutos from "../features/produtos/components/lista-produtos/lista-produtos";

const menuItens = [
    { key: 'home', label: 'Home', icon: <HomeOutlined /> },
    { key: 'usuarios', label: 'Usuários', icon: <UserOutlined /> },
    { key: 'produtos', label: 'produtos', icon: <ShoppingCartOutlined /> },
    { key: 'logout', label: 'logout', icon: <LogoutOutlined /> },
]

export default function AdminRoutes() {
    return (
        <Route element={<AdminLayout menuItens={menuItens} />}>
            <Route path='home' element={<h1>Home page</h1>} />
            <Route path='usuarios' element={<ListaUsuarios />} />
            {/* <Route path='cadastro' element={<CadastroUsuario />} /> */}
            {/* <Route path='consulta' element={<NovaConsulta />} /> */}
            <Route path='produtos' element={<ListaProdutos />} />
            <Route path='logout' element={<Logout />} />
            <Route path="*" element={<NotFoundRedirect to="/home" />} />
        </Route>
    )
}
