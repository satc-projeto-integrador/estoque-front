import { Select } from 'antd';
import useListTipoProduto from '../../../../api-data/tipos-produto/list/hook';

export default function SelectTipoProduto({ ...props }) {
    const { isLoading, data: options, handleFilterChange } = useListTipoProduto({ page: 1, rpp: 10 });

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
