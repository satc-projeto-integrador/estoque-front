import { Button, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../components/page-container.tsx/page-container';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import TableActions, { CustomAction, DeleteAction, EditAction } from '../../components/table-actions/table-actions';
import { Inventario } from '../../types/interfaces';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CadastroInventario from './cadastro-inventario/cadastro';
import useDeleteInventario from '../../api-data/inventario/delete/hook';
import useListInventario from '../../api-data/inventario/list/hook';
import { displayDate } from '../../utils';

const { Search } = Input;

export default function PageInventario() {
    const navigate = useNavigate();
    const criar = () => navigate('/inventarios/novo');
    const editar = (id: number) => navigate(`/inventarios/${id}/editar`);
    const listar = () => navigate('/inventarios');
    const deleteInventario = useDeleteInventario();

    const {
        isLoading,
        data: paginaProduto,
        pagination,
        handleFilterChange: changePaginatorFilter,
    } = useListInventario({ page: 1, rpp: 10 });

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const columns: ColumnsType<Inventario> = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            width: '40%',
        },
        {
            title: 'Data de Ínicio',
            dataIndex: 'dataInicio',
            width: '25%',
            align: 'center',
            render: (value) => displayDate(value) ?? '-',
        },
        {
            title: 'Data de Finalizacao',
            dataIndex: 'dataFim',
            width: '25%',
            align: 'center',
            render: (value) => displayDate(value) ?? '-',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index: number, row: Inventario) => {
                return (
                    <TableActions>
                        <CustomAction
                            icon={<EyeOutlined size={16} />}
                            onClick={() => navigate(`/inventarios/${row.id}/produtos`)}
                        />
                        <EditAction onClick={() => editar(row.id)} />
                        <DeleteAction onClick={() => deleteInventario(row.id)} />
                    </TableActions>
                );
            },
        },
    ];

    return (
        <>
            <PageHeader
                title="Inventários"
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
                    dataSource={paginaProduto?.list}
                    pagination={pagination}
                    rowKey={'id'}
                    loading={isLoading}
                />
            </DefaultPageContainer>

            <Routes>
                <Route path="/novo" element={<CadastroInventario open onClose={listar} onConfirm={listar} />} />
                <Route path="/:id/editar" element={<CadastroInventario open onClose={listar} onConfirm={listar} />} />
            </Routes>
        </>
    );
}
