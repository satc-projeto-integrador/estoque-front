import { Button, Form, Input, InputNumber, Modal, Skeleton } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useGetProduto from '../../../../api-data/produtos/get-one/hook';
import useCreateProduto from '../../../../api-data/produtos/create/hook';
import { Produto } from '../../../../types/interfaces';
import useUpdateProduto from '../../../../api-data/produtos/update/hook';
import { useParams } from 'react-router-dom';
import SelectTipoProduto from '../../../tipos-produto/components/select/select-tipos-produto';

type Props = {
    title: string;

    open: boolean;
    onClose?: () => void;
    onConfirm?: (produto: Produto) => void;
};

export default function CadastroProduto({ title, open, onClose, onConfirm }: Props) {
    const [form] = useForm();
    const createProduto = useCreateProduto();
    const updateProduto = useUpdateProduto();
    const { id } = useParams<{ id?: string }>();

    const { data: produto, isLoading, isFetched } = useGetProduto(Number(id));

    const onSubmit = async (values: any) => {
        values = {
            ...values,
            tipoProduto: Number.isInteger(values.tipoProduto) ? values.tipoProduto : values.tipoProduto?.value,
        };
        const produto = id ? await updateProduto(Number(id), values) : await createProduto(values);
        onConfirm?.(produto);
    };

    return (
        <>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Modal
                    title={title}
                    open={open}
                    onCancel={onClose}
                    footer={[
                        <Button key="cancel" onClick={onClose} type="text">
                            Cancelar
                        </Button>,
                        <Button key="submit" form="form-produto" type="primary" htmlType="submit">
                            Cadastrar
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        id="form-produto"
                        name="basic"
                        layout="vertical"
                        initialValues={{
                            ...produto,
                            tipoProduto: { value: produto?.tipoProduto?.id, label: produto?.tipoProduto?.descricao },
                        }}
                        onFinish={onSubmit}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Descrição"
                            name="descricao"
                            rules={[{ required: true, message: 'Por favor insira a descrição!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tipo de Produto"
                            name="tipoProduto"
                            rules={[{ required: true, message: 'Por favor insira o tipo de produto!' }]}
                        >
                            <SelectTipoProduto />
                        </Form.Item>

                        <Form.Item label="Quantidade Mínima" name="quantidadeMinima">
                            <InputNumber style={{ width: '100%' }} precision={2} />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
}
