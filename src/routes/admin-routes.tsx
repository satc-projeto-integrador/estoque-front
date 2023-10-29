import { Route } from 'react-router-dom';
import AdminLayout, { MenuOptions } from '../layouts/admin-layout/admin-layout';
import ListaUsuarios from '../features/usuarios/components/cadastro-usuarios/lista-usuarios';
import { HomeOutlined, LogoutOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import NotFoundRedirect from './not-found-redirect';
import { Logout } from '../features/auth/logout';
import PageProdutos from '../features/produtos/page-produtos';
import PageTiposProdutos from '../features/tipos-produto/page-tipos-produtos';

const menuItens: MenuOptions[] = [
    { key: 'home', label: 'Home', icon: <HomeOutlined /> },
    { key: 'usuarios', label: 'Usuários', icon: <UserOutlined /> },
    {
        key: 'produtos',
        label: 'Produtos',
        icon: <ShoppingCartOutlined />,
        children: [
            { key: 'tipos-produto', label: 'Tipos de Produto' },
            { key: 'produtos', label: 'Produtos' },
        ],
    },
    { key: 'logout', label: 'logout', icon: <LogoutOutlined /> },
];

export default function AdminRoutes() {
    return (
        <Route element={<AdminLayout menuItens={menuItens} />}>
            <Route path="home" element={<h1>Home page</h1>} />
            <Route path="usuarios" element={<ListaUsuarios />} />
            {/* <Route path='cadastro' element={<CadastroUsuario />} /> */}
            {/* <Route path='consulta' element={<NovaConsulta />} /> */}
            <Route path="tipos-produto/*" element={<PageTiposProdutos />} />
            <Route path="produtos/*" element={<PageProdutos />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<NotFoundRedirect to="/home" />} />
        </Route>
    );
}
