import { Form, Input, InputNumber, Select } from 'antd';
import './styled.css'
import { tipoProdutoOptions, useProdutoContext } from '../../providers/produto-provider';
import { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';

type Props = {
    id?: number,
    onFinish?: (cadastrou: boolean) => void
}

export default function CadastroProfissionais({ onFinish, id }: Props) {
    const ProdutoContext = useProdutoContext();
    const [form] = useForm()

    const onSubmit = (values: any) => {
        if (id) {
            //atribui o id nos valores
            values = { id, ...values }
            ProdutoContext.edit(id, values)
        } else {
            ProdutoContext.create(values)
        }

        onFinish && onFinish(true)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (id) {
            loadForm(ProdutoContext.getOne(id))
        }
    }, [id])

    const loadForm = (dados: any) => {
        form.setFieldsValue(dados)
    }

    return (
        <Form
            form={form}
            id="form-produto"
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
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
                label="Valor unitario"
                name="valor"
                rules={[{ required: true, message: 'Por favor insira o valor!' }]}

            >
                <InputNumber
                    style={{ width: '100%' }} 
                    precision={2}
                />
            </Form.Item>

            <Form.Item
                label="Tipo de Produto"
                name="tipo"
                rules={[{ required: true, message: 'Por favor insira o tipo de produto!' }]}
            >
                <Select placeholder="Selecione" options={tipoProdutoOptions} />
            </Form.Item>
        </Form>
    )
}