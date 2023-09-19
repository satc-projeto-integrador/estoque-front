import { useState } from "react";
import { Button, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PageHeader } from "@ant-design/pro-components";
import { PlusOutlined } from "@ant-design/icons";
import TableActions, { DeleteAction, EditAction } from "../../../../components/table-actions/table-actions";
import UsuarioService, { IUsuario } from "../../services/usuarios-service";
import CadastroUsuario from "../../../../features/usuarios/components/cadastro-usuarios/cadastro";

//TODO Atribuir contextos aos botões de ações de edição

const columns: ColumnsType<IUsuario> = [
    {
        title: 'Nome',
        dataIndex: 'nome',
    },
    {
        title: 'Sobrenome',
        dataIndex: 'sobrenome',
    },
    {
        title: 'Idade',
        dataIndex: 'idade',
    },
    {
        title: 'Ações',
        dataIndex: 'action',
        render: (_index, row) => {
            return (
                <TableActions>
                    <EditAction/>
                    {/* <EditAction onClick={() => { setIdSelecionado(row.id); showModal() }} /> */}
                    <DeleteAction/>
                    {/* <DeleteAction onClick={() => { usuarioContext.remove(row.id); handleTableChange(pagination) }} /> */}
                </TableActions>
            )
        }
    }
];

const usuarioService = new UsuarioService()
function ListaUsuarios() {
    const pageSize = 10
    const paginaUsuarios: Page<IUsuario> = usuarioService.get({ page: 1, pageSize })

    const [data, setData] = useState<Array<IUsuario>>(paginaUsuarios.data)
    const [pagination, setPagination] = useState({ page: 1, total: paginaUsuarios.totalCount, pageSize })

    const handleTableChange = (currentPagination: any) => {
        setPagination({ ...pagination, ...currentPagination })

        const fetchData = usuarioService.get({ page: currentPagination.current, pageSize })
        setData(fetchData.data)
    };

    const [idSelecionado, setIdSelecionado] = useState<number | undefined>()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIdSelecionado(undefined)
        setIsModalOpen(false);
        handleTableChange(pagination)
    };

    return (
        <>
            <PageHeader
                title="Usuários"
                extra={[
                    <Button key="cadastrar-produto" type="primary" icon={<PlusOutlined />} onClick={showModal}>Cadastrar</Button>
                ]}
            />
            <Table
                columns={columns}
                dataSource={data}s
                pagination={pagination}
                rowKey={'id'}
                onChange={handleTableChange}
            />

            <Modal title="Cadastro de Usuários" open={isModalOpen} onCancel={closeModal}
                footer={[
                    <Button key="cancel" onClick={closeModal} type="text">Cancelar</Button>,
                    <Button key="submit" form="form-produto" type="primary" htmlType="submit">Cadastrar</Button>
                ]}>
                <CadastroUsuario id={idSelecionado} onFinish={closeModal} />
            </Modal>
        </>
    )
}

export default ListaUsuarios;