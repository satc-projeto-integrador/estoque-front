import { TipoMovimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export type UpdateTipoMovimentacaoParams = {
    id: number;
    data: Partial<TipoMovimentacao>;
};

export const updateTipoMovimentacao = async ({ id, data }: UpdateTipoMovimentacaoParams): Promise<TipoMovimentacao> => {
    const result = await apiBackend.patch(`/api/v1/tipos-movimentacao/${id}`, data);
    return result.data;
};
