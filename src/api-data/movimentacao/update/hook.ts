import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

import { Movimentacao } from '../../../types/interfaces';
import { UpdateMovimentacaoParams, updateMovimentacao } from '.';

const useUpdateMovimentacao = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: UpdateMovimentacaoParams) => updateMovimentacao(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('movimentacao');
            notification.success({ message: 'Movimentacao atualizado com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao atualizar Movimentacao`,
            });
        },
    });
    return (id: number, data: Partial<Movimentacao>) => mutation.mutateAsync({ id, data });
};

export default useUpdateMovimentacao;
