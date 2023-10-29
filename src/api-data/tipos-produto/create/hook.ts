import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { TipoProduto } from '../../../types/interfaces';
import { createTipoProduto } from '.';

const useCreateTipoProduto = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: TipoProduto) => createTipoProduto(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('tipos-produtos');
            notification.success({ message: 'Tipo de Produto cadastrado com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao cadastrar Tipo de Produto`,
            });
        },
    });
    return (data: TipoProduto) => mutation.mutateAsync(data);
};

export default useCreateTipoProduto;
