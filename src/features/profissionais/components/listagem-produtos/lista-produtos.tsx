import { useState } from "react";
import { Button, Input, Modal, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PageHeader } from "@ant-design/pro-components";
import DefaultPageContainer from "../../../../components/page-container.tsx/page-container";
import { PlusOutlined } from "@ant-design/icons";
import { Produto } from "../../models"; // Importe o modelo de Produto ou defina-o conforme necessário

const { Search } = Input;

interface Pagination {
  current: number;
  total: number;
  pageSize: number;
}

function Lista() {
  const [data, setData] = useState<Array<Produto>>([]); // Altere para o modelo de Produto
  const [pagination, setPagination] = useState<Pagination>({ current: 1, total: 0, pageSize: 10 });
  const [idSelecionado, setIdSelecionado] = useState<number | undefined>();

  const handleTableChange = (currentPagination: any) => {
    // Aqui você deve buscar os dados dos produtos e atualizar o estado "data" e "pagination"
    // Substitua este código pelo método de busca real dos produtos em seu contexto
    // const fetchData = buscarProdutos(currentPagination.current, currentPagination.pageSize);
    // setData(fetchData.data);
    // setPagination({ ...pagination, ...currentPagination });
  };

  const onSearch = (filter: string) => {
    // Aqui você deve buscar os dados dos produtos com base no filtro e atualizar o estado "data" e "pagination"
    // Substitua este código pelo método de busca real dos produtos em seu contexto
    // const fetchData = buscarProdutosComFiltro(filter);
    // setData(fetchData.data);
    // setPagination({ current: 1, total: fetchData.totalCount, pageSize: pagination.pageSize });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIdSelecionado(undefined);
    setIsModalOpen(false);
    handleTableChange(pagination);
  };

  const columns: ColumnsType<Produto> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Nome do Produto',
      dataIndex: 'nome',
      width: '20%',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      width: '15%',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      width: '10%',
    },
    {
      title: 'Valor Unitário',
      dataIndex: 'valorUnitario',
      width: '15%',
    },
    {
      title: 'Valor Total',
      dataIndex: 'valorTotal',
      width: '15%',
    },
    {
      title: 'Observação',
      dataIndex: 'observacao',
      width: '15%',
    },
    {
      title: 'Ações',
      dataIndex: 'action',
      render: (_index, row) => {
        return (
          <TableActions>
            <EditAction onClick={() => { setIdSelecionado(row.id); showModal() }} />
            <DeleteAction onClick={() => { /* Implemente a remoção do produto aqui */ }} />
          </TableActions>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Listagem de Produtos"
        extra={[
          <Button key="cadastrar-produto" type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Cadastrar Produto
          </Button>,
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
          rowKey="id"
          onChange={handleTableChange}
        />

        <Modal
          title="Cadastro de Produto"
          visible={isModalOpen}
          onCancel={closeModal}
          footer={[
            <Button key="cancel" onClick={closeModal} type="text">
              Cancelar
            </Button>,
            <Button key="submit" /* Implemente a função de cadastrar produto aqui */ type="primary" htmlType="submit">
              Cadastrar
            </Button>,
          ]}
        >
          {/* Substitua "CadastroProdutos" pelo componente de cadastro de produtos */}
          {/* <CadastroProdutos id={idSelecionado} onFinish={closeModal} /> */}
        </Modal>
      </DefaultPageContainer>
    </>
  );
}

export default function ListaProdutos() {
  return <Lista />;
}
