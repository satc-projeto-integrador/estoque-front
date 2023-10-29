import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { deleteMovimentacao } from '.';

const useDeleteMovimentacao = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (id: number) => deleteMovimentacao(id), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('movimentacao');
            notification.success({ message: 'Movimentacao excluída com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao excluir Movimentacao`,
            });
        },
    });
    return (id: number) => mutation.mutateAsync(id);
};

export default useDeleteMovimentacao;
