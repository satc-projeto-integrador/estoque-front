import { Movimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export type UpdateMovimentacaoParams = {
    id: number;
    data: Partial<Movimentacao>;
};

export const updateMovimentacao = async ({ id, data }: UpdateMovimentacaoParams): Promise<Movimentacao> => {
    const result = await apiBackend.patch(`/api/v1/movimentacoes/${id}`, data);
    return result.data;
};
