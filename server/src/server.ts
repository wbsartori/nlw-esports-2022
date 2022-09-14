import express from "express";
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import {convertHourStringToMinutesString} from "./utils/convert-hour-string-to-minutes-string";
import {convertMinutesStringToHoursString} from "./utils/convert-minutes-string-to-hours-string";

const app = express();

app.use(express.json());
// Adicionar o dominio para dizer quem pode requisitar
// app.use(cors({
//     origin: 'http://dominio.com.br'
// }));
//

app.use(cors());

//const prisma = new PrismaClient({
//log['query']
// });
const prisma = new PrismaClient();

app.get("/games", async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });

    return response.json(games);
});

app.post("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id;
    const body : any = request.body;

    //aplicar validação aqui com a lib zod

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name  : body.name,
            yearsPlaying  : body.yearsPlaying,
            discord  : body.discord,
            weekDays  : body.weekDays.join(','),
            hourStart  : convertHourStringToMinutesString(body.hourStart),
            hourEnd  : convertHourStringToMinutesString(body.hourEnd),
            useVoiceChannel  : body.useVoiceChannel
        }
    });

    return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            yearsPlaying : true,
            discord : true,
            weekDays : true,
            hourStart : true,
            hourEnd : true,
            useVoiceChannel: true,
        },
        where: {
            gameId: gameId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    return response.json(ads.map (ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart : convertMinutesStringToHoursString(ad.hourStart),
            hourEnd : convertMinutesStringToHoursString(ad.hourEnd),
        }
    }));
});

app.get("/ads/:id/discord", async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord
    });
});

app.listen(3333);