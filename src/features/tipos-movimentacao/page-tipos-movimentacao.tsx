import { Button, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../components/page-container.tsx/page-container';
import { PlusOutlined } from '@ant-design/icons';
import TableActions, { DeleteAction, EditAction } from '../../components/table-actions/table-actions';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useDeleteTipoMovimentacao from '../../api-data/tipos-movimentacao/delete/hook';
import useListTipoMovimentacao from '../../api-data/tipos-movimentacao/list/hook';
import { TipoMovimentacao } from '../../types/interfaces';
import CadastroTipoMovimentacao from './components/cadastro-tipo-movimentacao/cadastro';

const { Search } = Input;

export default function PageTiposMovimentacao() {
    const navigate = useNavigate();
    const criar = () => navigate('tipos-movimentacao/novo');
    const editar = (id: number) => navigate(`tipos-movimentacao/${id}/editar`);
    const listar = () => navigate('tipos-movimentacao');
    const deleteTipoProduto = useDeleteTipoMovimentacao();

    const {
        isLoading,
        data: pageData,
        pagination,
        handleFilterChange: changePaginatorFilter,
    } = useListTipoMovimentacao({ page: 1, rpp: 10 });

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const columns: ColumnsType<TipoMovimentacao> = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            width: '45%',
        },
        {
            title: 'Tipo de Movimentacao',
            dataIndex: 'tipo',
            width: '45%',
            align: 'center',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index: number, row: TipoMovimentacao) => {
                return (
                    <TableActions>
                        <EditAction onClick={() => editar(row.id)} />
                        <DeleteAction onClick={() => deleteTipoProduto(row.id)} />
                    </TableActions>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader
                title="Tipos de Movimentacao"
                extra={[
                    <Button key="cadastrar" type="primary" icon={<PlusOutlined />} onClick={criar}>
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
                    dataSource={pageData?.list}
                    pagination={pagination}
                    rowKey={'id'}
                    loading={isLoading}
                />
            </DefaultPageContainer>

            <Routes>
                <Route
                    path="tipos-movimentacao/novo"
                    element={
                        <CadastroTipoMovimentacao
                            title="Criar Tipo de Movimentacao"
                            open
                            onClose={listar}
                            onConfirm={listar}
                        />
                    }
                />

                <Route
                    path="tipos-movimentacao/:id/editar"
                    element={
                        <CadastroTipoMovimentacao
                            title="Editar Tipo de Movimentacao"
                            open
                            onClose={listar}
                            onConfirm={listar}
                        />
                    }
                />
            </Routes>
        </>
    );
}
