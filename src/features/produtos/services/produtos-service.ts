import produtos from '../produtos.fake.json'

export interface IProdutos {
    id: number
    descricao: string,
    valor: number,
    tipo: String
}

export default class produtosService {

    get({ page, pageSize, filter }: GetOptions): Page<IProdutos> {
        const filterLower = (filter || '').toLocaleLowerCase()

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const fetchData = produtos
            .filter(produtos => produtos.descricao.toLocaleLowerCase().includes(filterLower)) // filtra pela descrição do produto
            .slice(startIndex, endIndex) // retorna apenas os registros da pagina

        return { data: fetchData, totalCount: produtos.length }
    }

}