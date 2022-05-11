const ApiError = require("../error/ApiError");
const {Product, Shipments} = require("../models/models");
const uuid = require('uuid')
const path = require('path');

class ProductController{
    async createProduct(req, res, next){
        try{
            let {name, weight, date_production, date_expiration, consumed_components, price, statusId, shipmentId} = req.body;
            date_production=date_production[1];
            date_expiration=date_expiration[1];
            const {img} = req.files | null;
            let fileName = null;
            if(img){
                let fileName = uuid.v4() + ".jpg"
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            const product = await Product.create({name, weight, date_production, date_expiration, consumed_components, price, img: fileName, statusId, shipmentId});

            return res.json(product)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async editProduct(req, res, next){
        try{
            const {id} = req.params;
            let {name, weight, date_production, date_expiration, consumed_components, price, statusId, shipmentId} = req.body;

            const product = await Product.update(
                {name, weight, date_production, date_expiration, consumed_components, price, statusId, shipmentId},
                {where: {id}}
            );

            return res.json(product)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {statusId, limit, page} = req.query
        page = page || 1
        limit = limit || 15
        let offset = page * limit - limit
        let products;
        if (!statusId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (statusId) {
            products = await Product.findAndCountAll({where:{statusId}, limit, offset})
        }

        return res.json(products)
    }

    async getOne(req,res){
        const {id} = req.params;

        const product = await Product.findOne({
            where: {id},
        })
        return res.json(product);
    }

    async deleteProduct(req, res){
        const {id} = req.params;

        const product =await Product.destroy({
            where: {id}
        })
        return res.json(product);
    }
}

module.exports = new ProductController()