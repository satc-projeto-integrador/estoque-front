import { GetPageOptions, Page, SaldoProduto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type RelatorioSaldoFilters = {
    produtoIds?: number[];
    dataFinal?: Date;
};
export type Result = Page<SaldoProduto>;
export type ListRelatorioSaldoParam = GetPageOptions & RelatorioSaldoFilters;

export const listRelatorioSaldo = async (params: ListRelatorioSaldoParam): Promise<Result> => {
    const result = await apiBackend.get('/api/v1/saldo-produtos/relatorio', { params });
    return result.data;
};
