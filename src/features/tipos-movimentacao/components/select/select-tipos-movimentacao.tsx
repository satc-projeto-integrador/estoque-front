import { Select } from 'antd';
import useListTipoMovimentacao from '../../../../api-data/tipos-movimentacao/list/hook';

export default function SelectTipoMovimentacao({ ...props }) {
    const { isLoading, data: options, handleFilterChange } = useListTipoMovimentacao({ page: 1, rpp: 10 });

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
