import categoryModel from "../models/category.model.js";

export default {
    create: async (req, res) => {
        try {
            const { uz, ru, slug } = req.body;
            if (!uz || !ru || !slug) throw new Error("Fill the rows");
            // 
            const category = new categoryModel({
                title: {
                    uz,
                    ru
                },
                slug
            });
            await category.save();
            res.send({
                ok: true,
                msg: "Successfully created",
                data: {
                    _id: category._id,
                    title: {
                        uz,
                        ru
                    },
                    slug,
                    posts: 0
                }
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            })
        }
    },
    getAll: async (_, res) => {
        try {
            const categories = await categoryModel.find({}).select('title slug');
            const data = [];
            for (let c of categories) {
                data.push({
                    _id: c?._id,
                    uz: c.title.uz,
                    ru: c.title.ru,
                    slug: c.slug,
                    posts: await c.posts()
                })
            }
            console.log(data)
            res.send({
                ok: true,
                data
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.query;
            const category = await categoryModel.findById(id).select('title slug');
            if (!category) throw new Error("Category not found");
            res.send({
                ok: true,
                data: {
                    ...category.toObject(),
                    posts: await category.posts()
                }
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.query;
            const { uz, ru, slug } = req.body;
            if (!uz || !ru || !slug) throw new Error("Fill the rows");
            const category = await categoryModel.findByIdAndUpdate(id, {
                title: {
                    uz,
                    ru
                },
                slug
            }, { new: true }).select('title slug');
            if (!category) throw new Error("Category not found");
            res.send({
                ok: true,
                msg: "Successfully updated",
                data: {
                    _id: category._id,
                    title: {
                        uz,
                        ru
                    },
                    slug,
                    posts: await category.posts()
                }
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.query;
            const category = await categoryModel.findByIdAndDelete(id);
            if (!category) throw new Error("Category not found");
            res.send({
                ok: true,
                msg: "Successfully deleted",
                data: {
                    _id: category._id,
                }
            });
        } catch (error) {
            res.send({
                ok: false,
                msg: error.message
            })
        }
    }
}