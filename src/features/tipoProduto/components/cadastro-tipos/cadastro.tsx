import { Form, Input, InputNumber, Select } from 'antd';
import './styled.css'
import { useTipoContext } from '../../providers/tipo-provider';
import { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';

type Props = {
    id?: number,
    onFinish?: (cadastrou: boolean) => void
}

export default function CadastroTipo({ onFinish, id }: Props) {
    const TipoContext = useTipoContext();
    const [form] = useForm()

    const onSubmit = (values: any) => {
        if (id) {
            //atribui o id nos valores
            values = { id, ...values }
            TipoContext.edit(id, values)
        } else {
            TipoContext.create(values)
        }

        onFinish && onFinish(true)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (id) {
            loadForm(TipoContext.getOne(id))
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
                label="Nome do Tipo"
                name="tipo"
                rules={[{ required: true, message: 'Por favor insira o nome do tipo!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}