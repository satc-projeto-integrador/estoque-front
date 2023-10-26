import tipos from '../tipos.fake.json'

export interface ITipos {
    id: number
    tipo: string
}

export default class tiposService {

    get({ page, pageSize, filter }: GetOptions): Page<ITipos> {
        const filterLower = (filter || '').toLocaleLowerCase()

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const fetchData = tipos
            .filter(tipos => tipos.tipo.toLocaleLowerCase().includes(filterLower)) // filtra pelo nome do tipo
            .slice(startIndex, endIndex) // retorna apenas os registros da pagina

        return { data: fetchData, totalCount: tipos.length }
    }

}