import { Card, Col, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../components/page-container.tsx/page-container';
import { SaldoProduto } from '../../types/interfaces';
import useListSaldoBaixo from '../../api-data/saldo/estoque-baixo/hook';

const { Search } = Input;

export default function HomePage() {
    const {
        isLoading,
        data: pageData,
        pagination,
        handleFilterChange: changePaginatorFilter,
    } = useListSaldoBaixo({ page: 1, rpp: 10 });

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const columns: ColumnsType<SaldoProduto> = [
        {
            title: 'Produto',
            dataIndex: 'produto',
            width: '40%',
            render: (_, row) => row.produto.descricao,
        },
        {
            title: 'Qtd. mínima',
            dataIndex: ['produto', 'quantidadeMinima'],
            width: '30%',
            align: 'center',
        },
        {
            title: 'Qtd. Atual',
            dataIndex: 'quantidade',
            width: '30%',
            align: 'center',
        },
    ];

    return (
        <>
            <PageHeader title="Home"></PageHeader>
            <DefaultPageContainer>
                <Row>
                    <Col span={24}>
                        <Card title="Estoque Baixo">
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
                        </Card>
                    </Col>
                </Row>
            </DefaultPageContainer>
        </>
    );
}
