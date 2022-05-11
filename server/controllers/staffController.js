const ApiError = require("../error/ApiError");
const {Staff} = require("../models/models");

class StaffController{
    async createStaff(req, res, next){
        try{
            let {lastname, name, patronymic} = req.body;

            const staff = await Staff.create({lastname, name, patronymic});

            return res.json(staff)
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res){
        const staff = await Staff.findAll();
        return res.json(staff);
    }

    async getOne(req, res){
        const {id} = req.params;
        const staff = await Staff.findOne(
            {
                where: {id}
            },
        )
        return res.json(staff)
    }

    async deleteStaff(req, res){
        const {id} = req.params;
        const staff = await Staff.destroy(
            {
                where: {id}
            },
        )

        return res.json(staff);
    }
}

module.exports = new StaffController()