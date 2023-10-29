import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../components/page-container.tsx/page-container';
import { PlusOutlined } from '@ant-design/icons';
import TableActions, { DeleteAction, EditAction } from '../../components/table-actions/table-actions';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useDeleteMovimentacao from '../../api-data/movimentacao/delete/hook';
import useListMovimentacao from '../../api-data/movimentacao/list/hook';
import { Movimentacao } from '../../types/interfaces';
import CadastroMovimentacao from './components/cadastro-movimentacao/cadastro';
import { displayDate } from '../../utils';

export default function PageMovimentacao() {
    const navigate = useNavigate();
    const criar = () => navigate('movimentacoes/novo');
    const editar = (id: number) => navigate(`movimentacoes/${id}/editar`);
    const listar = () => navigate('movimentacoes');
    const deleteTipoProduto = useDeleteMovimentacao();

    const { isLoading, data: pageData, pagination } = useListMovimentacao({ page: 1, rpp: 10 });

    const columns: ColumnsType<Movimentacao> = [
        {
            title: 'Data',
            dataIndex: 'dataMovimentacao',
            width: '10%',
            render: (value) => displayDate(value),
            align: 'center',
        },
        {
            title: 'Tipo de Movimentacao',
            dataIndex: 'tipo',
            width: '30%',
            align: 'center',
            render: (_, row) => row.tipoMovimentacao?.descricao || '-',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            width: '20%',
            align: 'center',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index: number, row: Movimentacao) => {
                return (
                    <TableActions>
                        <EditAction onClick={() => editar(row.id)} />
                        <DeleteAction onClick={() => deleteTipoProduto(row.id)} />
                    </TableActions>
                );
            },
            align: 'right',
        },
    ];

    return (
        <>
            <PageHeader
                title="Movimentacoes"
                extra={[
                    <Button key="cadastrar" type="primary" icon={<PlusOutlined />} onClick={criar}>
                        Cadastrar
                    </Button>,
                ]}
            ></PageHeader>
            <DefaultPageContainer>
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
                    path="movimentacoes/novo"
                    element={
                        <CadastroMovimentacao
                            title="Criar Tipo de Movimentacao"
                            open
                            onClose={listar}
                            onConfirm={listar}
                        />
                    }
                />

                <Route
                    path="movimentacoes/:id/editar"
                    element={
                        <CadastroMovimentacao
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
