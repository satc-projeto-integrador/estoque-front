import { Button, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import { CaretDownOutlined, CheckOutlined, FallOutlined, PlusOutlined, RiseOutlined } from '@ant-design/icons';

import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useRequiredParams } from '../../../components/required-params/required-params';
import useListProdutosInventario from '../../../api-data/inventario/produtos/list/hook';
import { InventarioProduto } from '../../../types/interfaces';
import DefaultPageContainer from '../../../components/page-container.tsx/page-container';
import useGetInventario from '../../../api-data/inventario/get-one/hook';
import { displayDate } from '../../../utils';
import TableActions, { EditAction } from '../../../components/table-actions/table-actions';
import ModalProduto from './modal-produto/modal-produto';

const { Search } = Input;

export default function PageInventarioProdutos() {
    console.log('dasdnasdsadas');
    const { inventarioId } = useRequiredParams(['inventarioId']);
    const { data: inventario } = useGetInventario(+inventarioId);
    const navigate = useNavigate();
    // const criar = () => navigate('inventarios/novo');
    const editar = (id: number) => navigate(`${id}`);
    const listar = () => navigate(-1);
    // const deleteInventario = useDeleteInventario();

    const {
        isLoading,
        data: paginaProduto,
        pagination,
        handleFilterChange: changePaginatorFilter,
        handlePaginationChange: changePagination,
    } = useListProdutosInventario({ page: 1, rpp: 10, inventarioId: +inventarioId });

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const columns: ColumnsType<InventarioProduto> = [
        {
            title: 'Produto',
            dataIndex: ['produto', 'descricao'],
            width: '40%',
        },
        {
            title: 'Quantidade Estoque',
            dataIndex: 'quantidadeEstoque',
            width: '25%',
            align: 'center',
        },
        {
            title: 'Quantidade Encontrada',
            dataIndex: 'quantidadeEncontrada',
            width: '25%',
            align: 'center',
            render: (_, row) => (
                <p>
                    {row.quantidadeEncontrada}
                    {'  '}
                    {+row.quantidadeEncontrada < +row.quantidadeEstoque ? (
                        <FallOutlined style={{ color: 'red' }} />
                    ) : (
                        <CheckOutlined style={{ color: 'green' }} />
                    )}
                </p>
            ),
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index: number, row: InventarioProduto) => {
                return (
                    <TableActions>
                        <EditAction onClick={() => editar(row.id)} />
                    </TableActions>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader
                onBack={() => navigate(-1)}
                title={`Inventário: ${inventario?.descricao} - ${displayDate(inventario?.dataInicio)}`}
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
                <Route path=":id" element={<ModalProduto open onClose={listar} onConfirm={listar} />} />
            </Routes>
        </>
    );
}
