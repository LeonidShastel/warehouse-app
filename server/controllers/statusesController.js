const ApiError = require("../error/ApiError");
const {Statuses} = require("../models/models");

class StatusesController{
    async createProduct(req, res, next){
        try{
            let {name} = req.body;

            const status = await Statuses.create({name});

            return res.json(status)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res){
        const products = await Statuses.findAll();
        return res.json(products);
    }

    async getOne(req, res){
        const {id} = req.params;
        const status = await Statuses.findOne(
            {
                where: {id}
            },
        )
        return res.json(status)
    }

    async deleteStatus(req, res){
        const {id} = req.params;
        const status = await Statuses.destroy(
            {
                where: {id}
            },
        )

        return res.json(status);
    }
}

module.exports = new StatusesController()