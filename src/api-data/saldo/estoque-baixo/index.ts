import { GetPageOptions, Page, SaldoProduto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type ListSaldoResult = Page<SaldoProduto>;
export type ListSaldoParams = GetPageOptions & {
    q?: string;
};

export const listSaldoBaixo = async (params: ListSaldoParams): Promise<ListSaldoResult> => {
    const result = await apiBackend.get('/api/v1/saldo-produtos/estoque-baixo', { params });
    return result.data;
};