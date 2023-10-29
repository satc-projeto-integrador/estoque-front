import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

import { TipoProduto } from '../../../types/interfaces';
import { UpdateTipoProdutoParams, updateTipoProduto } from '.';

const useUpdateTipoProduto = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: UpdateTipoProdutoParams) => updateTipoProduto(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('tipos-produtos');
            notification.success({ message: 'Tipo de Produto atualizado com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao atualizar Tipo de Produto`,
            });
        },
    });
    return (id: number, data: Partial<TipoProduto>) => mutation.mutateAsync({ id, data });
};

export default useUpdateTipoProduto;
