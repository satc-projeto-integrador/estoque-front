import { Button, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../components/page-container.tsx/page-container';
import { PlusOutlined } from '@ant-design/icons';
import TableActions, { DeleteAction, EditAction } from '../../components/table-actions/table-actions';
import { TipoProduto } from '../../types/interfaces';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CadastroTipoProduto from './components/cadastro-tipo-produto/cadastro';
import useDeleteTipoProduto from '../../api-data/tipos-produto/delete/hook';
import useListTipoProduto from '../../api-data/tipos-produto/list/hook';

const { Search } = Input;

export default function PageTiposProdutos() {
    const navigate = useNavigate();
    const criar = () => navigate('tipos-produto/novo');
    const editar = (id: number) => navigate(`tipos-produto/${id}/editar`);
    const listar = () => navigate('tipos-produto');
    const deleteTipoProduto = useDeleteTipoProduto();

    const {
        isLoading,
        data: pageData,
        pagination,
        handleFilterChange: changePaginatorFilter,
    } = useListTipoProduto({ page: 1, rpp: 10 });

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const columns: ColumnsType<TipoProduto> = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            width: '90%',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index: number, row: TipoProduto) => {
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
                title="Tipos de Produto"
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
                    path="tipos-produto/novo"
                    element={
                        <CadastroTipoProduto title="Criar Tipo de Produto" open onClose={listar} onConfirm={listar} />
                    }
                />

                <Route
                    path="tipos-produto/:id/editar"
                    element={
                        <CadastroTipoProduto title="Editar Tipo de Produto" open onClose={listar} onConfirm={listar} />
                    }
                />
            </Routes>
        </>
    );
}
