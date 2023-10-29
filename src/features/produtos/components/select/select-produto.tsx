import { Select } from 'antd';
import useListProdutos from '../../../../api-data/produtos/list/hook';

export default function SelectProduto({ ...props }) {
    const { isLoading, data: options, handleFilterChange } = useListProdutos({ page: 1, rpp: 10 });

    const search = (value: string) => {
        handleFilterChange({ fetchParams: { q: value } });
    };

    return (
        <Select
            loading={isLoading}
            fieldNames={{ value: 'id', label: 'descricao' }}
            showSearch
            onSearch={search}
            options={options?.list}
            filterOption={false}
            {...props}
        />
    );
}
