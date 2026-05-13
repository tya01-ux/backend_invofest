import { Request, Response } from 'express';
import { Event } from '../types/event';

let events: Event[] = [];


// 1. Menampilkan daftar event
export const getEvents = (req: Request, res: Response) => {
    res.json(events);
};


// 2. Menyimpan data event baru
export const createEvent = (req: Request, res: Response) => {
    const { name, date, time, location } = req.body;

    if (!name || !date || !time || !location) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        });
    }

    const newEvent: Event = {
        id: events.length + 1,
        name,
        date,
        time,
        location
    };

    events.push(newEvent);

    res.status(201).json({
        message: "Data berhasil disimpan",
        event: newEvent
    });
};


// 3. Menampilkan detail event berdasarkan ID
export const showEvent = (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id as string);

    const event = events.find(e => e.id === eventId);

    if (!event) {
        return res.status(404).json({
            message: "Event tidak ditemukan"
        });
    }

    res.status(200).json({
        message: "Event berhasil ditampilkan",
        event
    });
};


// 4. Mengupdate data event berdasarkan ID
export const updateEvent = (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id as string);

    const event = events.find(e => e.id === eventId);

    if (!event) {
        return res.status(404).json({
            message: "Event tidak ditemukan"
        });
    }

    const { name, date, time, location } = req.body;

    if (!name || !date || !time || !location) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        });
    }

    event.name = name;
    event.date = date;
    event.time = time;
    event.location = location;

    res.status(200).json({
        message: "Event berhasil diupdate",
        event
    });
};


// 5. Menghapus data event berdasarkan ID
export const deleteEvent = (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id as string);

    const eventIndex = events.findIndex(e => e.id === eventId);

    if (eventIndex === -1) {
        return res.status(404).json({
            message: "Event tidak ditemukan"
        });
    }

    events.splice(eventIndex, 1);

    res.status(200).json({
        message: "Event berhasil dihapus"
    });
};