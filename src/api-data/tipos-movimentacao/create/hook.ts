import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { TipoMovimentacao } from '../../../types/interfaces';
import { createTipoMovimentacao } from '.';

const useCreateTipoMovimentacao = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: TipoMovimentacao) => createTipoMovimentacao(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('tipos-movimentacao');
            notification.success({ message: 'Tipo de Movimentacao cadastrado com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao cadastrar Tipo de Movimentacao`,
            });
        },
    });
    return (data: TipoMovimentacao) => mutation.mutateAsync(data);
};

export default useCreateTipoMovimentacao;
