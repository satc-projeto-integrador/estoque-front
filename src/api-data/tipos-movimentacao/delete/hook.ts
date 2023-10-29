import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTipoMovimentacao } from '.';

const useDeleteTipoMovimentacao = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (id: number) => deleteTipoMovimentacao(id), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('tipos-movimentacao');
            notification.success({ message: 'Tipo de Movimentacao excluído com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao excluir Tipo de Movimentacao`,
            });
        },
    });
    return (id: number) => mutation.mutateAsync(id);
};

export default useDeleteTipoMovimentacao;
