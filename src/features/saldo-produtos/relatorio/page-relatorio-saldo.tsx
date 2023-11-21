import { Col, DatePicker, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import DefaultPageContainer from '../../../components/page-container.tsx/page-container';
import SelectProduto from '../../produtos/components/select/select-produto';
import { useEffect, useState } from 'react';
import { RelatorioSaldoFilters } from '../../../api-data/saldo/list-relatorio';
import useListRelatorioSaldo from '../../../api-data/saldo/list-relatorio/hook';

export default function PageRelatorioSaldo() {
    const [filter, setFilter] = useState<RelatorioSaldoFilters>();
    const {
        isLoading,
        data: pageData,
        pagination,
        handleFilterChange: changePaginatorFilter,
    } = useListRelatorioSaldo({ page: 1, rpp: 10 });

    useEffect(() => {
        changePaginatorFilter({ fetchParams: { ...filter } });
    }, [filter]);

    const columns: ColumnsType<any> = [
        {
            title: 'Produto',
            dataIndex: 'produto_descricao',
            width: '30%',
            align: 'left',
        },
        {
            title: 'Quantidade',
            dataIndex: 'saldo',
            width: '10%',
            align: 'center',
        },
    ];

    return (
        <>
            <PageHeader title="Relatório de Movimentacões"></PageHeader>
            <DefaultPageContainer>
                <Row style={{ marginBottom: '16px' }} gutter={24}>
                    <Col span={4}>
                        <DatePicker
                            style={{ width: '100%' }}
                            onChange={(value) =>
                                setFilter({
                                    ...filter,
                                    dataFinal: value?.toDate(),
                                })
                            }
                        />
                    </Col>
                    <Col span={4}>
                        <SelectProduto
                            style={{ width: '100%' }}
                            placeholder="Produtos"
                            mode="multiple"
                            onChange={(produtoIds: number[]) => setFilter({ ...filter, produtoIds })}
                        />
                    </Col>
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
