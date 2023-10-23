import { useState } from 'react';
import { Button, Input, Modal, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../../../components/page-container.tsx/page-container';
import { PlusOutlined } from '@ant-design/icons';
import TableActions, { DeleteAction, EditAction } from '../../../../components/table-actions/table-actions';
import CadastroProdutos from '../cadastro-produto/cadastro';
import useListarProdutos from '../../../../api-data/produtos/listar/hook';
import { Produto } from '../../../../types/interfaces';

const { Search } = Input;

export default function ListaProdutos() {
    const {
        isLoading,
        data: paginaProduto,
        pagination,
        handleFilterChange: changePaginatorFilter,
        handlePaginationChange: changePagination,
    } = useListarProdutos({ page: 1, rpp: 10 });

    const [idSelecionado, setIdSelecionado] = useState<number | undefined>();

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIdSelecionado(undefined);
        setIsModalOpen(false);
        changePagination({ page: 1 });
    };

    const columns: ColumnsType<Produto> = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            width: '30%',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            width: '30%',
        },
        {
            title: 'Tipo de Produto',
            dataIndex: 'tipo',
            width: '30%',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index: number, row: Produto) => {
                return (
                    <TableActions>
                        <EditAction
                            onClick={() => {
                                setIdSelecionado(row.id);
                                showModal();
                            }}
                        />
                        <DeleteAction
                            onClick={() => {
                                /* */
                            }}
                        />
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
                    <Button key="cadastrar-produto" type="primary" icon={<PlusOutlined />}>
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

                <Modal
                    title="Cadastro de Produtos"
                    open={isModalOpen}
                    onCancel={closeModal}
                    footer={[
                        <Button key="cancel" onClick={closeModal} type="text">
                            Cancelar
                        </Button>,
                        <Button key="submit" form="form-produto" type="primary" htmlType="submit">
                            Cadastrar
                        </Button>,
                    ]}
                >
                    <CadastroProdutos id={idSelecionado} onFinish={closeModal} />
                </Modal>
            </DefaultPageContainer>
        </>
    );
}
