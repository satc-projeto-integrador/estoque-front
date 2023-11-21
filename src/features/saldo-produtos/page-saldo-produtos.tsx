import { Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../components/page-container.tsx/page-container';
import { SaldoProduto } from '../../types/interfaces';
import useListSaldo from '../../api-data/saldo/list/hook';

const { Search } = Input;

export default function PageSaldoProduto() {
    const {
        isLoading,
        data: pageData,
        pagination,
        handleFilterChange: changePaginatorFilter,
    } = useListSaldo({ page: 1, rpp: 10 });

    const onSearch = (filter: string) => {
        changePaginatorFilter({ fetchParams: { q: filter } });
    };

    const columns: ColumnsType<SaldoProduto> = [
        {
            title: 'Produto',
            dataIndex: 'produto',
            width: '45%',
            render: (_, row) => row.produto.descricao,
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantidade',
            width: '45%',
            align: 'center',
        },
    ];

    return (
        <>
            <PageHeader title="Saldo Estoque"></PageHeader>
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
        </>
    );
}
