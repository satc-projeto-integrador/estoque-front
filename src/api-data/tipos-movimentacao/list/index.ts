import { GetPageOptions, Page, TipoMovimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export type ListTipoMovimentacaoResult = Page<TipoMovimentacao>;
export type ListTipoMovimentacaoParams = GetPageOptions & {
    q?: string;
};

export const listTipoMovimentacao = async (params: ListTipoMovimentacaoParams): Promise<ListTipoMovimentacaoResult> => {
    const result = await apiBackend.get('/api/v1/tipos-movimentacao', { params });
    return result.data;
};
