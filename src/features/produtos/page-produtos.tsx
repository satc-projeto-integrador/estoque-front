import { Button, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../components/page-container.tsx/page-container';
import { PlusOutlined } from '@ant-design/icons';
import TableActions, { DeleteAction, EditAction } from '../../components/table-actions/table-actions';
import useListProdutos from '../../api-data/produtos/list/hook';
import { Produto } from '../../types/interfaces';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CadastroProduto from './components/cadastro-produto/cadastro';
import useDeleteProduto from '../../api-data/produtos/delete/hook';

const { Search } = Input;

export default function PageProdutos() {
    const navigate = useNavigate();
    const criar = () => navigate('produtos/novo');
    const editar = (id: number) => navigate(`produtos/${id}/editar`);
    const listar = () => navigate('produtos');
    const deleteProduto = useDeleteProduto();

    const {
        isLoading,
        data: paginaProduto,
        pagination,
        handleFilterChange: changePaginatorFilter,
        handlePaginationChange: changePagination,
    } = useListProdutos({ page: 1, rpp: 10 });

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const columns: ColumnsType<Produto> = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            width: '40%',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            width: '25%',
            align: 'center',
        },
        {
            title: 'Tipo de Produto',
            dataIndex: 'tipo',
            width: '25%',
            align: 'center',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index: number, row: Produto) => {
                return (
                    <TableActions>
                        <EditAction onClick={() => editar(row.id)} />
                        <DeleteAction onClick={() => deleteProduto(row.id)} />
                    </TableActions>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader
                title="Produtos"
                extra={[
                    <Button key="cadastrar-produto" type="primary" icon={<PlusOutlined />} onClick={criar}>
                        Cadastrar
                    </Button>,
                ]}
            ></PageHeader>
            <DefaultPageContainer>
                <Row style={{ marginBottom: '16px' }}>
                    <Search allowClear placeholder="Buscar..." style={{ width: 200 }} onSearch={onSearch} />
                </Row>
                <Table
                    columns={columns}
                    dataSource={paginaProduto?.list}
                    pagination={pagination}
                    rowKey={'id'}
                    loading={isLoading}
                />
            </DefaultPageContainer>

            <Routes>
                <Route
                    path="produtos/novo"
                    element={<CadastroProduto title="Criar Produto" open onClose={listar} onConfirm={listar} />}
                />

                <Route
                    path="produtos/:id/editar"
                    element={<CadastroProduto title="Editar Produto" open onClose={listar} onConfirm={listar} />}
                />
            </Routes>
        </>
    );
}
