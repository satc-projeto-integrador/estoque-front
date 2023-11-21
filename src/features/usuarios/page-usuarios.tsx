import { Button, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../components/page-container.tsx/page-container';
import { PlusOutlined } from '@ant-design/icons';
import TableActions, { DeleteAction, EditAction } from '../../components/table-actions/table-actions';
import { TipoProduto, Usuario } from '../../types/interfaces';
import { Route, Routes, useNavigate } from 'react-router-dom';

import useDeleteTipoProduto from '../../api-data/tipos-produto/delete/hook';
import useListTipoProduto from '../../api-data/tipos-produto/list/hook';
import useListUsuario from '../../api-data/usuario/list/hook';
import CadastroUsuario from './modal/cadastro';

const { Search } = Input;

export default function PageUsuarios() {
    const navigate = useNavigate();
    const criar = () => navigate('usuarios/novo');
    const editar = (id: number) => navigate(`usuarios/${id}/editar`);
    const listar = () => navigate('usuarios');
    // const deleteTipoProduto = useDeleteTipoProduto();

    const {
        isLoading,
        data: pageData,
        pagination,
        handleFilterChange: changePaginatorFilter,
    } = useListUsuario({ page: 1, rpp: 10 });

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const columns: ColumnsType<Usuario> = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            width: '60%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '30%',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index: number, row: Usuario) => {
                return (
                    <TableActions>
                        <EditAction onClick={() => editar(row.id)} />
                        {/* <DeleteAction onClick={() => deleteTipoProduto(row.id)} /> */}
                    </TableActions>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader
                title="Usuários"
                extra={[
                    <Button key="cadastrar" type="primary" icon={<PlusOutlined />} onClick={criar}>
                        Cadastrar
                    </Button>,
                ]}
            ></PageHeader>
            <DefaultPageContainer>
                {/* <Row style={{ marginBottom: '16px' }}>
                    <Search allowClear placeholder="Buscar..." style={{ width: 200 }} onSearch={onSearch} />
                </Row> */}
                <Table
                    columns={columns}
                    dataSource={pageData?.list}
                    pagination={pagination}
                    rowKey={'id'}
                    loading={isLoading}
                />
            </DefaultPageContainer>

            <Routes>
                <Route
                    path="usuarios/novo"
                    element={<CadastroUsuario title="Criar Tipo de Produto" open onClose={listar} onConfirm={listar} />}
                />

                <Route
                    path="usuarios/:id/editar"
                    element={
                        <CadastroUsuario title="Editar Tipo de Produto" open onClose={listar} onConfirm={listar} />
                    }
                />
            </Routes>
        </>
    );
}
