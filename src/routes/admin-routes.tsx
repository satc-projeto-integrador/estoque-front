import { Route } from 'react-router-dom';
import AdminLayout, { MenuOptions } from '../layouts/admin-layout/admin-layout';
import ListaUsuarios from '../features/usuarios/components/cadastro-usuarios/lista-usuarios';
import {
    HomeOutlined,
    LogoutOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    SwapOutlined,
    DropboxOutlined,
    ReconciliationOutlined,
} from '@ant-design/icons';
import NotFoundRedirect from './not-found-redirect';
import { Logout } from '../features/auth/logout';
import PageProdutos from '../features/produtos/page-produtos';
import PageTiposProdutos from '../features/tipos-produto/page-tipos-produtos';
import PageTiposMovimentacao from '../features/tipos-movimentacao/page-tipos-movimentacao';
import PageMovimentacao from '../features/movimentacoes/page-movimentacao';
import PageSaldoProduto from '../features/saldo-produtos/page-saldo-produtos';
import PageInventario from '../features/inventarios/page-inventarios';
import PageInventarioProdutos from '../features/inventarios/produtos/page-inventario-produtos';
import HomePage from '../features/home/home-page';
import PageRelatorioMovimentacao from '../features/movimentacoes/relatorio/page-relatorio-movimentacao';
import PageRelatorioSaldo from '../features/saldo-produtos/relatorio/page-relatorio-saldo';

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
    {
        key: 'mov',
        label: 'Movimentacoes',
        icon: <SwapOutlined />,
        children: [
            { key: 'movimentacoes/relatorio', label: 'Relatório' },
            { key: 'tipos-movimentacao', label: 'Tipos de Movimentacão' },
            { key: 'movimentacoes', label: 'Movimentacões' },
        ],
    },
    {
        key: 'inventarios',
        label: 'Inventários',
        icon: <ReconciliationOutlined />,
    },
    {
        key: 'saldo',
        label: 'Saldo',
        icon: <SwapOutlined />,
        children: [
            { key: 'saldo-estoque', label: 'Estoque Atual' },
            { key: 'saldo-estoque/relatorio', label: 'Relatório' },
        ],
    },

    { key: 'logout', label: 'Log Out', icon: <LogoutOutlined /> },
];

export default function AdminRoutes() {
    return (
        <Route element={<AdminLayout menuItens={menuItens} />}>
            <Route path="home" element={<HomePage />} />
            <Route path="usuarios" element={<ListaUsuarios />} />
            <Route path="tipos-produto/*" element={<PageTiposProdutos />} />
            <Route path="produtos/*" element={<PageProdutos />} />
            <Route path="tipos-movimentacao/*" element={<PageTiposMovimentacao />} />
            <Route path="movimentacoes/*" element={<PageMovimentacao />} />
            <Route path="movimentacoes/relatorio" element={<PageRelatorioMovimentacao />} />
            <Route path="inventarios/*" element={<PageInventario />} />
            <Route path="inventarios/:inventarioId/produtos/*" element={<PageInventarioProdutos />} />
            <Route path="saldo-estoque" element={<PageSaldoProduto />} />
            <Route path="saldo-estoque/relatorio" element={<PageRelatorioSaldo />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<NotFoundRedirect to="/home" />} />
        </Route>
    );
}
