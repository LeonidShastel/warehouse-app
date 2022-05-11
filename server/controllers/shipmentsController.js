const ApiError = require("../error/ApiError");
const {Shipments, Product} = require("../models/models");

class ShipmentsController{
    async createShipment(req, res, next){
        try{
            let {productId, count, date, staffId} = req.body;

            const shipment = await Shipments.create({productId, count, date, staffId});

            return res.json(shipment)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async editShipment(req, res, next){
        try{
            const {id} = req.params;
            let {productId, count, date, staffId} = req.body;

            const shipment = await Shipments.update(
                {productId, count, date, staffId},
                {where: {id}}
            );

            return res.json(shipment)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 15
        let offset = page * limit - limit
        let shipments;
        shipments = await Shipments.findAndCountAll({limit, offset})
        return res.json(shipments)
    }

    async getOne(req, res){
        const {id} = req.params;
        const shipments = await Shipments.findOne(
            {
                where: {id}
            },
        )
        return res.json(shipments)
    }

    async deleteShipment(req,res){
        const {id} = req.params;

        const shipment = await Shipments.destroy(
            {
                where: {id}
            }
        )

        return shipment;
    }
}

module.exports = new ShipmentsController()