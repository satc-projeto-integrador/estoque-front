import { Button, Form, Input, Modal, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';

import { TipoProduto } from '../../../../types/interfaces';
import { useParams } from 'react-router-dom';
import useCreateTipoProduto from '../../../../api-data/tipos-produto/create/hook';
import useUpdateTipoProduto from '../../../../api-data/tipos-produto/update/hook';
import useGetTipoProduto from '../../../../api-data/tipos-produto/get-one/hook';

type Props = {
    title: string;

    open: boolean;
    onClose?: () => void;
    onConfirm?: (produto: TipoProduto) => void;
};

export default function CadastroTipoProduto({ title, open, onClose, onConfirm }: Props) {
    const [form] = useForm();
    const createTipoProduto = useCreateTipoProduto();
    const updateProduto = useUpdateTipoProduto();
    const { id } = useParams<{ id?: string }>();

    const { data: tipoProduto, isLoading } = useGetTipoProduto(Number(id));

    const onSubmit = async (values: any) => {
        const produto = id ? await updateProduto(Number(id), values) : await createTipoProduto(values);
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
                        initialValues={tipoProduto}
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
                    </Form>
                </Modal>
            )}
        </>
    );
}
