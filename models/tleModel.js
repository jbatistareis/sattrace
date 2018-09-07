var postgresDatabase = require('../database/postgresDatabase.js');

module.exports = {
    parseError: (res, error) => postgresDatabase.parseError(res, error),
    findAll: () => {
        return postgresDatabase.query(
            'select * from tle order by name',
            []);
    },
    findByCategory: (categoryId) => {
        return postgresDatabase.query(
            'select * from tle where category = $1 order by name',
            [categoryId]);
    },
    findById: (tleId) => {
        return postgresDatabase.query(
            'select * from tle where id in($1) order by name',
            [tleId]);
    },
    new: (tle) => {
        return postgresDatabase.insert(
            'insert into tle (name, line1, line2, category) values ($1, $2, $3, $4) returning id',
            [tle.name, tle.line1, tle.line2, tle.category]);
    },
    update: (tle) => postgresDatabase.update(
        'update tle set name = $1, line1 = $2, line2 = $3, category = $4 where id = $5',
        [tle.name, tle.line1, tle.line2, tle.category, tle.id]),
    delete: (tleId) => postgresDatabase.delete(
        'delete from tle where id = $1',
        [tleId]
    ),
    search: (tle) => {
        return postgresDatabase.query(
            'select * from tle where name like $1 order by name',
            ['%' + tle.name + '%']
        )
    },
    bulkSave: (tles) => {
        let values = '';
        for (let i = 0; i < tles.length; i += 4)
            values += `($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}), `;

        postgresDatabase.update(
            `INSERT INTO tle (name, line1, line2, category) VALUES ${values.substring(0, values.length - 2)} `
            + 'ON CONFLICT (name, line1, line2) DO UPDATE SET line1 = EXCLUDED.line1, line2 = EXCLUDED.line2',
            tles);
    }
};