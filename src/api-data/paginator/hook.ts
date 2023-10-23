import { GetPageOptions, Page } from '../../types/interfaces';
import { useState } from 'react';
import { useQuery } from 'react-query';

export type UsePaginatorOptions<T> = {
    queryKey: string[];
    fetch: (options: GetPageOptions) => Promise<Page<T>>;
    page: number;
    rpp?: number;
    fetchParams?: any;
};

type HandlePaginationChangeParams = {
    page: number;
    rpp?: number;
};

type HandleFilterChangeParams = {
    fetchParams?: any;
};

const usePaginator = <T>(options: UsePaginatorOptions<T>) => {
    const [page, setPage] = useState<number>(options.page || 1);
    const [rpp, setRpp] = useState<number>(options.rpp || 10);
    const [fetchParams, setFetchParams] = useState(options.fetchParams || 10);

    const query = useQuery(
        [...options.queryKey, page, rpp, fetchParams],
        () => options.fetch({ page, rpp, ...fetchParams }),
        {
            keepPreviousData: true,
        },
    );

    const handlePaginationChange = ({ page: newPage, rpp: newRpp }: HandlePaginationChangeParams) => {
        if (newPage !== page) {
            setPage(newPage);
            setRpp(newRpp || rpp);
            return;
        }

        if (newRpp && newRpp !== rpp) {
            setPage(1);
            setRpp(newRpp);
        }
    };

    const handleFilterChange = ({ fetchParams: newFetchParams }: HandleFilterChangeParams) => {
        setPage(1);
        setFetchParams(newFetchParams);
    };

    return {
        pagination: {
            current: page,
            pageSize: rpp,
            total: query.data?.totalCount,
            showSizeChanger: true,
            onChange: (page: number, rpp: number) => handlePaginationChange({ page, rpp }),
        },
        handlePaginationChange,
        handleFilterChange,
        ...query,
    };
};

export default usePaginator;
