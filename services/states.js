const states = require('../models/states');
const cities = require('../models/cities');
const methods = require('../methods');

const statesService = {
    getAll: async (req, res) => {
        const { page, noLimit } = req.body;
        try {
            if (!noLimit) {
                const count = await states.countDocuments('states');
                const countPage = page - 1
                const limit = 10;
                const skip = (limit * countPage - 1) + 1  
    
                const items = await states.find().skip(skip).limit(limit);
    
                res.json({items, total: count}).status(200);
            } else {
                const items = await states.find();
                
                res.json({items}).status(200);
            }
        } catch (error) {
            res.json(error).status(500);
        }
    },
    filter: async (req, res) => {
        const { name, initials } = req.body;
        try {
            if (name) {
                const data = await states.find({ name: { $regex: new RegExp(name), $options: 'i' }})
                res.json(data).status(200);
            }
            else if (initials) {
                const data = await states.find({ initials: { $regex: new RegExp(initials), $options: 'i' } });
                res.json(data).status(200);
            }
            else {
                const data = await states.find()
                res.json(data).status(200);
            }

        } catch (error) {
            res.json(error).status(500)
        }
    },
    save: async (req, res) => {
        const payload = req.body;
        try {
            if (!payload.name || !payload.initials) throw { msg: 'Dados inválidos', status: 400 }
            const state = {
                name: methods.capitalize(payload.name),
                initials: payload.initials.toString().toUpperCase(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            const existsState = await states.findOne({ initials: state.initials })

            if (existsState) throw { msg: 'Estado já existe no sistema', status: 400 }

            const data = await states.create(state)
            res.json(data).status(201);

        } catch (error) {
            if (error.status) res.status(error.status).json(error.msg)
            else res.json(error).status(500);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const citieAssociated = await cities.find({ stateId: id })
            if (citieAssociated.length) throw { msg: 'Não é possivel deletar um estado com cidades associadas', status: 400 }

            if (!id) throw { msg: 'Id não informado', status: 400 }
            const data = await states.remove({ _id: id })
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
            if (!payload.name || !payload.initials) throw { msg: 'Dados inválidos', status: 400 }
            const state = {
                name: methods.capitalize(payload.name),
                initials: payload.initials.toString().toUpperCase(),
                updatedAt: new Date(),
            }
            const existsState = await states.findOne({ name: state.name })

            if (existsState) throw { msg: 'Estado já existe no sistema', status: 400 }

            const data = await states.updateOne({ _id: id }, state, { multi: false })
            res.json(data).status(204);

        } catch (error) {
            if (error.status) res.status(error.status).json(error.msg)
            else res.json(error).status(500);
        }
    }
}

module.exports = statesService