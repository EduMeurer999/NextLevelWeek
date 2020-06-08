import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([
        {title: 'Lâmpadas', image: 'lampadas.svg'},
        {title: 'Pilhas e baterias', image: 'baterias.svg'},
        {title: 'Papéis e papelão', image: 'papeis-papelao.svg'},
        {title: 'Residuos eletrônicos', image: 'eletronicos.svg'},
        {title: 'Residuos orgânicos', image: 'organicos.svg'},
        {title: 'Óleo de cozinha', image: 'oleo.svg'},

    ])
}