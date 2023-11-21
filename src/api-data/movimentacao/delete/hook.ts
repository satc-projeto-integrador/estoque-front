import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { deleteMovimentacao } from '.';

const useDeleteMovimentacao = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (id: number) => deleteMovimentacao(id), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('movimentacao');
            await queryClient.invalidateQueries('saldo');
            await queryClient.invalidateQueries('relatorio-movimentacao');
            notification.success({ message: 'Movimentacao excluída com sucesso' });
        },
    });
    return (id: number) => mutation.mutateAsync(id);
};

export default useDeleteMovimentacao;
