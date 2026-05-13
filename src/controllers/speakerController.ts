import { Request, Response } from 'express';
import { speaker } from '../types/speaker';

let speakers: speaker[] = [];


// 1. Menampilkan daftar speaker
export const getSpeakers = (req: Request, res: Response) => {
    res.json(speakers);
};


// 2. Menyimpan data speaker baru
export const createSpeaker = (req: Request, res: Response) => {
    const { name, role, image } = req.body;

    if (!name || !role || !image) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        });
    }

    const newSpeaker: speaker = {
        id: speakers.length + 1,
        name,
        role,
        image
    };

    speakers.push(newSpeaker);

    res.status(201).json({
        message: "Data berhasil disimpan",
        speaker: newSpeaker
    });
};


// 3. Menampilkan detail speaker berdasarkan ID
export const showSpeaker = (req: Request, res: Response) => {
    const speakerId = parseInt(req.params.id as string);

    const speaker = speakers.find(s => s.id === speakerId);

    if (!speaker) {
        return res.status(404).json({
            message: "Speaker tidak ditemukan"
        });
    }

    res.status(200).json({
        message: "Speaker berhasil ditampilkan",
        speaker
    });
};


// 4. Mengupdate data speaker berdasarkan ID
export const updateSpeaker = (req: Request, res: Response) => {
    const speakerId = parseInt(req.params.id as string);

    const speaker = speakers.find(s => s.id === speakerId);

    if (!speaker) {
        return res.status(404).json({
            message: "Speaker tidak ditemukan"
        });
    }

    const { name, role, image } = req.body;

    if (!name || !role || !image) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        });
    }

    speaker.name = name;
    speaker.role = role;
    speaker.image = image;

    res.status(200).json({
        message: "Speaker berhasil diupdate",
        speaker
    });
};


// 5. Menghapus data speaker berdasarkan ID
export const deleteSpeaker = (req: Request, res: Response) => {
    const speakerId = parseInt(req.params.id as string);

    const speakerIndex = speakers.findIndex(s => s.id === speakerId);

    if (speakerIndex === -1) {
        return res.status(404).json({
            message: "Speaker tidak ditemukan"
        });
    }

    speakers.splice(speakerIndex, 1);

    res.status(200).json({
        message: "Speaker berhasil dihapus"
    });
};