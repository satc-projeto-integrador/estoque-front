import { Col, DatePicker, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PageHeader } from '@ant-design/pro-components';
import useListRelatorioMovimentacao from '../../../api-data/movimentacao/list-relatorio/hook';
import { displayMoney } from '../../../utils';
import DefaultPageContainer from '../../../components/page-container.tsx/page-container';
import SelectProduto from '../../produtos/components/select/select-produto';
import SelectTipoProduto from '../../tipos-produto/components/select/select-tipos-produto';
import { useEffect, useState } from 'react';
import { RelatorioMovimentacaoFilters } from '../../../api-data/movimentacao/list-relatorio';

const { RangePicker } = DatePicker;

export default function PageRelatorioMovimentacao() {
    const [filter, setFilter] = useState<RelatorioMovimentacaoFilters>();
    const {
        isLoading,
        data: pageData,
        pagination,
        handleFilterChange: changePaginatorFilter,
    } = useListRelatorioMovimentacao({ page: 1, rpp: 10 });

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
            title: 'Tipo de Produto',
            dataIndex: 'tipoProduto_descricao',
            width: '25%',
            align: 'center',
            render: (_, row) => row.tipoProduto_descricao || '-',
        },
        {
            title: 'Tipo de Movimentacão',
            dataIndex: 'tipoMovimentacao_descricao',
            width: '25%',
            align: 'center',
            render: (_, row) => row.tipoMovimentacao_descricao || '-',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            width: '10%',
            align: 'center',
            render: (value) => displayMoney(value),
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantidade',
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
                        <RangePicker
                            style={{ width: '100%' }}
                            onChange={(values) =>
                                setFilter({
                                    ...filter,
                                    dataInicio: values?.[0]?.toDate(),
                                    dataFim: values?.[1]?.toDate(),
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
                    <Col span={4}>
                        <SelectTipoProduto
                            style={{ width: '100%' }}
                            placeholder="Tipos de produto"
                            mode="multiple"
                            onChange={(tipoProdutoIds: number[]) => setFilter({ ...filter, tipoProdutoIds })}
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
