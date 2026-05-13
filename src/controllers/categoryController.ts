import { Request, Response } from 'express';
import { Category } from '../types/category';

let categories: Category[] = [];


// 1. Menampilkan daftar category
export const getCategories = (req: Request, res: Response) => {
    res.json(categories);
};


// 2. Menyimpan data category baru
export const createCategory = (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        });
    }

    const newCategory: Category = {
        id: categories.length + 1,
        name
    };

    categories.push(newCategory);

    res.status(201).json({
        message: "Data berhasil disimpan",
        category: newCategory
    });
};


// 3. Menampilkan detail category berdasarkan ID
export const showCategory = (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id as string);

    const category = categories.find(c => c.id === categoryId);

    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan"
        });
    }

    res.status(200).json({
        message: "Category berhasil ditampilkan",
        category
    });
};


// 4. Mengupdate data category berdasarkan ID
export const updateCategory = (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id as string);

    const category = categories.find(c => c.id === categoryId);

    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan"
        });
    }

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name harus diisi"
        });
    }

    category.name = name;

    res.status(200).json({
        message: "Category berhasil diupdate",
        category
    });
};


// 5. Menghapus data category berdasarkan ID
export const deleteCategory = (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id as string);

    const categoryIndex = categories.findIndex(c => c.id === categoryId);

    if (categoryIndex === -1) {
        return res.status(404).json({
            message: "Category tidak ditemukan"
        });
    }

    categories.splice(categoryIndex, 1);

    res.status(200).json({
        message: "Category berhasil dihapus"
    });
};