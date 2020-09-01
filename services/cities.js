const cities = require('../models/cities');
const states = require('../models/states');
const methods = require('../methods');

const citiesService = {
    getAll: async (req, res) => {
        const { page } = req.body;
        try {
            const count = await cities.countDocuments('cities');
            const countPage = page - 1
            const limit = 10;
            const skip = (limit * countPage - 1) + 1  

            const items = await cities.find().skip(skip).limit(limit);

            res.json({items, total: count}).status(200);
        } catch (error) {
            res.json(error).status(500);
        }
    },
    filter: async (req, res) => {
        const { name, initials } = req.body;
        try {
            if (name) {
                const data = await cities.find({ name: methods.capitalize(name) })
                res.json(data).status(200);
            }
            else {
                const data = await cities.find()
                res.json(data).status(200);
            }

        } catch (error) {
            res.json(error).status(500)
        }
    },
    save: async (req, res) => {
        const payload = req.body;
        try {
            if (!payload.name || !payload.stateId) throw { msg: 'Dados inválidos', status: 400 }

            const citie = {
                name: methods.capitalize(payload.name),
                stateId: payload.stateId,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            const existsCitie = await cities.find({ name: citie.name })

            if (existsCitie.length) throw { msg: 'Cidade já existe no sistema', status: 400 }


            const data = await cities.create(citie)
            res.json(data).status(201);

        } catch (error) {
            if (error.status) res.status(error.status).json(error.msg)
            else res.json(error).status(500);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            if (!id) throw { msg: 'Id não informado', status: 400 }
            const data = await cities.remove({ _id: id })
            res.json(data).status(204);

        } catch (error) {
            if (error.status) res.status(error.status).json(error.msg)
            else res.json(error).status(500);
        }
    },
    update: async (req, res) => {
        const payload = req.body;
        const { id } = req.params
        try {
            if (!payload.name || !payload.stateId) throw { msg: 'Dados inválidos', status: 400 }
            const citie = {
                name: methods.capitalize(payload.name),
                stateId: payload.stateId,
                updatedAt: new Date(),
            }

            const existsCitie = await cities.find({ name: citie.name })

            if (existsCitie.length) throw { msg: 'Cidade já existe no sistema', status: 400 }
            
            const data = await cities.updateOne({ _id: id }, citie, { multi: false })
            res.json(data).status(204);

        } catch (error) {
            if (error.status) res.status(error.status).json(error.msg)
            else res.json(error).status(500);
        }
    }
}

module.exports = citiesService