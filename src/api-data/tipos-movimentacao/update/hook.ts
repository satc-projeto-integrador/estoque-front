import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

import { TipoProduto } from '../../../types/interfaces';
import { UpdateTipoMovimentacaoParams, updateTipoMovimentacao } from '.';

const useUpdateTipoMovimentacao = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: UpdateTipoMovimentacaoParams) => updateTipoMovimentacao(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('tipos-movimentacao');
            notification.success({ message: 'Tipo de Movimentacao atualizado com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao atualizar Tipo de Movimentacao`,
            });
        },
    });
    return (id: number, data: Partial<TipoProduto>) => mutation.mutateAsync({ id, data });
};

export default useUpdateTipoMovimentacao;
