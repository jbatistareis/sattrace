var postgresDatabase = require('../database/postgresDatabase.js');

module.exports = {
    findAll: () => {
        return postgresDatabase.query(
            'select * from category order by name',
            []);
    },
    new: (category) => {
        return postgresDatabase.insert(
            'insert into category (name, description) values ($1, $2)',
            [category.name, category.description]);
    },
    update: (category) => postgresDatabase.update(
        'update category set name = $1, description = $2 where id = $3',
        [category.name, category.description, category.id]),
    delete: (categoryId) => postgresDatabase.delete(
        'delete from category where id = $1',
        [categoryId]
    )
};