import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { Movimentacao } from '../../../types/interfaces';
import { createMovimentacao } from '.';

const useCreateMovimentacao = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: Movimentacao) => createMovimentacao(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('movimentacao');
            notification.success({ message: 'Movimentacao cadastrado com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao cadastrar Movimentacao`,
            });
        },
    });
    return (data: Movimentacao) => mutation.mutateAsync(data);
};

export default useCreateMovimentacao;