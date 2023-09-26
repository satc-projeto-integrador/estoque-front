import { useState } from "react";
import { Button, Input, Modal, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PageHeader } from "@ant-design/pro-components";
import DefaultPageContainer from "../../../../components/page-container.tsx/page-container";
import { PlusOutlined } from "@ant-design/icons";
import TableActions, { DeleteAction, EditAction } from "../../../../components/table-actions/table-actions";
import { TipoProvider, Tipo, useTipoContext } from "../../providers/tipo-provider";
import CadastroTipos from "../cadastro-tipos/cadastro";
const { Search } = Input;

interface Pagination {
    current: number,
    total: number,
    pageSize: number
}

function Lista() {
    const tipoContext = useTipoContext()
    const pageSize = 10
    const paginaTipo: Page<Tipo> = tipoContext.get({ page: 1, pageSize })

    const [data, setData] = useState<Array<Tipo>>(paginaTipo.data)
    const [pagination, setPagination] = useState<Pagination>({ current: 1, total: paginaTipo.totalCount, pageSize })
    const [idSelecionado, setIdSelecionado] = useState<number | undefined>()

    const handleTableChange = (currentPagination: any) => {
        const fetchData = tipoContext.get({ page: currentPagination.current, pageSize })
        setPagination({ ...pagination, ...currentPagination })
        setData(fetchData.data)
    };

    const onSearch = (filter: string) => {
        const fetchData = tipoContext.get({ page: 1, pageSize, filter })
        setPagination({ current: 1, total: paginaTipo.totalCount, pageSize })
        setData(fetchData.data)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIdSelecionado(undefined)
        setIsModalOpen(false);
        handleTableChange(pagination)
    };

    const columns: ColumnsType<Tipo> = [
        {
            title: 'Nome do Tipo',
            dataIndex: 'tipo',
            width: '90%'
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            render: (_index, row) => {
                return (
                    <TableActions>
                        <EditAction onClick={() => { setIdSelecionado(row.id); showModal() }} />
                        <DeleteAction onClick={() => { tipoContext.remove(row.id); handleTableChange(pagination) }} />
                    </TableActions>
                )
            }
        }
    ];

    return (
        <>
            <PageHeader
                title="Tipos de Produtos"
                extra={[
                    <Button key="cadastrar-tipo" type="primary" icon={<PlusOutlined />} onClick={showModal}>Cadastrar</Button>
                ]}
            ></PageHeader>
            <DefaultPageContainer>
                <Row style={{ marginBottom: '16px' }}>
                    <Search placeholder="Buscar..." onSearch={onSearch} style={{ width: 200 }} />
                </Row>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={pagination}
                    rowKey={'id'}
                    onChange={handleTableChange}
                />

                <Modal title="Cadastro de Tipos de Produtos" open={isModalOpen} onCancel={closeModal}
                    footer={[
                        <Button key="cancel" onClick={closeModal} type="text">Cancelar</Button>,
                        <Button key="submit" form="form-produto" type="primary" htmlType="submit">Cadastrar</Button>
                    ]}>
                    <CadastroTipos id={idSelecionado} onFinish={closeModal} />
                </Modal>
            </DefaultPageContainer>
        </>
    )
}

export default function ListaTipos() {
    return <TipoProvider><Lista /></TipoProvider>
};