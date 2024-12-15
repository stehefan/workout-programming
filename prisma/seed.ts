import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    console.time("Seeding complete 🌱");

    console.log('Creating users ...')
    const users = await prisma.user.createManyAndReturn({
        data: [
            {
                clerkUserId: process.env.CLERK_DEV_USER_ID!,
            },
            {
                clerkUserId: process.env.CLERK_PROD_USER_ID!
            }
        ]
    });
    console.log('... done!')

    for (const user of users) {
        console.log(`Creating programs for user ${user.id} ...`);
        await prisma.program.create({
            data: {
                name: "First Program",
                userId: user.id,
                workouts: {
                    create: [
                        {
                            "name": "Squat & push",
                            "userId": user.id,
                            "sections": {
                                create: [
                                    {
                                        "name": "Breathing",
                                        "roundCount": 1,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "Pelvis Tilts",
                                                    "measureUnit": "reps",
                                                    "measureCount": "∞",
                                                    "videoUrl": process.env.SEED_PELVIS_TILTS_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Pelvis Tilts",
                                                            "description": "Pelvis Tilts",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/pelvis_tilts_preview-u7oYYZhJFKRfisUo18kfSHltfFbGfB.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "as many as you need um vom Kopf in den Körper zu kommen",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Rolle",
                                                    "measureUnit": "reps",
                                                    "measureCount": "15-20",
                                                    "videoUrl": null,
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Positioning & Warm Up",
                                        "roundCount": 2,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "Bear plank serratus push ups",
                                                    "measureUnit": "reps",
                                                    "measureCount": "8-10",
                                                    "videoUrl": process.env.SEED_BEAR_PLANK_SERRAUS_PUSHUPS_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Bear plank serratus push ups",
                                                            "description": "Bear plank serratus push ups",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/bear_plank_serratus_preview-HUWB80DmcE1jwEVUz7U1ahwO8aaSDt.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "One hand elevated: linker Ellenbogen nach außen, rechts nach hinten. Immer locker lassen ",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Kneeling lean backs",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6-8",
                                                    "videoUrl": process.env.SEED_KNEELING_LEAN_BACKS_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Kneeling lean backs",
                                                            "description": "Kneeling lean backs",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/kneeling_lean_back_preview-iNiQmStNpedgk9godIBMuTwUk7tV6Y.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Vierfuessler Haende an Wand pull ups",
                                                    "measureUnit": "reps",
                                                    "measureCount": "10-12",
                                                    "videoUrl": process.env.SEED_VIERFUESSLER_HAND_AN_WAND_PULLUPS_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Vierfuessler Haende an Wand pull ups",
                                                            "description": "Vierfuessler Haende an Wand pull ups",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/vierfuessler_pull_preview-ChjXCByZ5nPBgD7fCrsNN000S73zbm.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Dynamics",
                                        "roundCount": 2,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "half kneeling to knee drive (jump)",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6-8",
                                                    "videoUrl": process.env.SEED_HALF_KNEELING_TO_KNEE_DRIVE_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "half kneeling to knee drive (jump)",
                                                            "description": "half kneeling to knee drive (jump)",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/half_knee_drive_preview-zspW1XpaSCh6a7HJY4Bo5YaxZPFu0M.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "Oben dann Gewicht auf die Ferse: Ellenbogen nach vorne ",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Drop into push up",
                                                    "measureUnit": "reps",
                                                    "measureCount": "8-10",
                                                    "videoUrl": process.env.SEED_DROP_INTO_PUSHUP_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Drop into push up",
                                                            "description": "Drop into push up",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/drop_push_up_preview-H0XgQ99OhsE4OnMvIRwo0rpZBTf4e2.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "Hintern runter ",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Split squat low jumps yielding",
                                                    "measureUnit": "reps",
                                                    "measureCount": "10",
                                                    "videoUrl": process.env.SEED_SPLIT_SQUAT_LOW_JUMPS_YIELDING_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Split squat low jumps yielding",
                                                            "description": "Split squat low jumps yielding",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/split_squat_jumps_preview-6Bnk93r4kIRgzdx0bIjEXc79ezsxS6.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Mains",
                                        "roundCount": 4,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "Front squat",
                                                    "measureUnit": "reps",
                                                    "measureCount": "5-6",
                                                    "videoUrl": process.env.SEED_FRONT_SQUAT_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Front squat",
                                                            "description": "Front squat",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/front_squat_preview-XEPZLjFQ6a3NZvOwIGPy7MexhXFBOi.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": " Pauli style,  75kg; Fokus auf Hüfte unter den Körper bekommen",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Sit to jump",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6-8",
                                                    "videoUrl": process.env.SEED_SIT_TO_JUMP_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Sit to jump",
                                                            "description": "Sit to jump",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/sit_to_jump_preview-NuSzCTg0lBMEgTwcHPeFtoHVLBHMmr.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "Keine Ballerina Füße, Gewicht auf den Ballen und nicht auf die Zehen",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Reziprok chest press KH",
                                                    "measureUnit": "reps",
                                                    "measureCount": "8",
                                                    "videoUrl": process.env.SEED_REZIPROKE_CHEST_PRESS_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Reziprok chest press KH",
                                                            "description": "Reziprok chest press KH",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/reziprok_chest_pres_preview-REv1HMVaj99ZZbZoZAkHDu9laiMqA2.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "Anzahl pro Seite, Kopf in richtung heruntergehendem Arm, 12,5kg",
                                                    "userId": user.id,
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Accessories",
                                        "roundCount": 2,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "Ausfallschritt Kombi",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6",
                                                    "videoUrl": process.env.SEED_AUSFALLSCHRITT_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Ausfallschritt Kombi",
                                                            "description": "Ausfallschritt Kombi",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/ausfallschritt_kombi_preview-b59B8KH1ZZ0ZUPVrL7NT4yArOLZYvG.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "Oberkörper Rotation mit Gewicht",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Seated Windmill OHP",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6-8",
                                                    "videoUrl": process.env.SEED_SEATED_WINDMILL_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Seated Windmill OHP",
                                                            "description": "Seated Windmill OHP",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/seated_windmill_ohp_preview-dCWtx5TBaWAmgvolos5OCxg9PwCQot.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "10kg",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Renegade row kneeling iso hamstring",
                                                    "measureUnit": "reps",
                                                    "measureCount": "8-10",
                                                    "videoUrl": process.env.SEED_RENEGADE_ROW_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Renegade row kneeling iso hamstring",
                                                            "description": "Renegade row kneeling iso hamstring",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/renegade_row_kneel_preview-FhyDbDaXx59KT9mGivObwOtzrGuygf.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "Eine Hand erhoeht; Anzahl pro Seite, 12,5kg",
                                                    "userId": user.id,
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                        ,
                        {
                            "name": "Hinge & pull",
                            "userId": user.id,
                            "sections": {
                                create: [
                                    {
                                        "name": "Breathing",
                                        "roundCount": 1,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "Pelvis Tilts",
                                                    "measureUnit": "reps",
                                                    "measureCount": "∞",
                                                    "videoUrl": process.env.SEED_PELVIS_TILTS_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Pelvis Tilts",
                                                            "description": "Pelvis Tilts",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/pelvis_tilts_preview-u7oYYZhJFKRfisUo18kfSHltfFbGfB.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "as many as you need um vom Kopf in den Koerper zu kommen",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Rolle slow mo",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6-8",
                                                    "videoUrl": null,
                                                    "note": null,
                                                    "userId": user.id,
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Positioning & Warm ",
                                        "roundCount": 2,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "hamstring bridge FF auf BR iso",
                                                    "measureUnit": "seconds",
                                                    "measureCount": "30",
                                                    "videoUrl": process.env.SEED_HAMSTRING_BRIDGE_FF_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "hamstring bridge FF auf BR iso",
                                                            "description": "hamstring bridge FF auf BR iso",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/hamstring_bridge_ff_preview-VS2d1ui7A32SRiu8d2UuARY66frh9G.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "heel to forefoot hamstring bridge dynamisch",
                                                    "measureUnit": "reps",
                                                    "measureCount": "15",
                                                    "videoUrl": process.env.SEED_HEEL_TO_FOREFOOT_HAMSTRING_BRIDGE_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "heel to forefoot hamstring bridge dynamisch",
                                                            "description": "heel to forefoot hamstring bridge dynamisch",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/heel_forefoot_bridg_preview-MZw0OEEmbfcRf16D23kSenZZnej1oY.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "kneeling hip hinge",
                                                    "measureUnit": "reps",
                                                    "measureCount": "12-15",
                                                    "videoUrl": process.env.SEED_KNEELING_HIP_HINGE_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "kneeling hip hinge",
                                                            "description": "kneeling hip hinge",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/kneeling_hip_hinge_preview-Qq5YLxeqmxGsTOKNmHKxD2INpqmejF.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Seitstuetz",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6-8",
                                                    "videoUrl": process.env.SEED_SEITSTUETZ_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Seitstuetz",
                                                            "description": "Seitstuetz",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/seitstuetz_hip_ext_preview-93O5kXCWug9FtU9DzItaa1jKa63Kuv.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": " ein Fuss an Wand hip extension; Anzahl der Wiederholungen für Atemzüge",
                                                    "userId": user.id,
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Dynamics",
                                        "roundCount": 2,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "power step up",
                                                    "measureUnit": "reps",
                                                    "measureCount": "8-10",
                                                    "videoUrl": process.env.SEED_POWER_STEP_UP_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "power step up",
                                                            "description": "power step up",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/power_step_up_preview-KFe7nCiPJGhE6Pjab7kzlhdW1AMcMJ.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Vierfuessler jump an Wand mit Haenden",
                                                    "measureUnit": "reps",
                                                    "measureCount": "12-15",
                                                    "videoUrl": process.env.SEED_VIERFUESSLER_JUMP_AN_WAND_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Vierfuessler jump an Wand mit Haenden",
                                                            "description": "Vierfuessler jump an Wand mit Haenden",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/vierfuessler_jump_preview-52T9CgkjW4HSYVGjI8kxCKojBe6Ydp.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Kickstance hinge into wall ball",
                                                    "measureUnit": "reps",
                                                    "measureCount": "10",
                                                    "videoUrl": process.env.SEED_KICKSTANCE_HINGE_WALL_BALL_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Kickstance hinge into wall ball",
                                                            "description": "Kickstance hinge into wall ball",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/kickstance_wallball_preview-gHwGNkDcPFHgIQfLRLewADFZj0KVSO.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Mains",
                                        "roundCount": 4,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [

                                                {
                                                    "exerciseName": "Tbar kickstance hinge",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6-8",
                                                    "videoUrl": process.env.SEED_TBAR_KICKSTANCE_HINGE_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Tbar kickstance hinge",
                                                            "description": "Tbar kickstance hinge",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/tbar_kickstance_preview-0Xc64AmEMY2IYd4Bvj7QrI7A33qqPK.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "20kg",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Low seated UL pull down mit festhalten",
                                                    "measureUnit": "reps",
                                                    "measureCount": "8-10",
                                                    "videoUrl": process.env.SEED_LOW_SEATED_UL_PULL_DOWN_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Low seated UL pull down mit festhalten",
                                                            "description": "Low seated UL pull down mit festhalten",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/low_seated_pulldown_preview-yGAQnqM36CWEdTWwpc2xTnQ4vkt0da.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "45kg",
                                                    "userId": user.id,
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Accessories",
                                        "roundCount": 2,
                                        "userId": user.id,
                                        "exercises": {
                                            create: [
                                                {
                                                    "exerciseName": "Faultier row",
                                                    "measureUnit": "reps",
                                                    "measureCount": "12",
                                                    "videoUrl": process.env.SEED_FAULTIER_ROW_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Faultier row",
                                                            "description": "Faultier row",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/faultier_row_preview-HGwLhN432C0MzgJmVLe2IJUhmTtYjx.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "immer linkes Bein aufgestellt, auf beiden Seiten durchführen; 18kg",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Hinge zu clean and press",
                                                    "measureUnit": "reps",
                                                    "measureCount": "8-10",
                                                    "videoUrl": process.env.SEED_HINGE_TO_CLEAN_AND_PRESS_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Hinge zu clean and press",
                                                            "description": "Hinge zu clean and press",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/hinge_clean_press_preview-Ud7gXdwWmWy2aGKHHimbk4bm5mGdMe.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": "16kg",
                                                    "userId": user.id,
                                                },
                                                {
                                                    "exerciseName": "Triceps hold Klappmesser",
                                                    "measureUnit": "reps",
                                                    "measureCount": "6-8",
                                                    "videoUrl": process.env.SEED_TRICEPS_HOLD_KLAPPMESSER_VIDEO,
                                                    "image": {
                                                        create: {
                                                            "title": "Triceps hold Klappmesser",
                                                            "description": "Triceps hold Klappmesser",
                                                            "imageUrl": "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/triceps_klappmesser_preview-p79WfPLHQSyvSqsSzuY2dOo4rQ6eba.png",
                                                            "userId": user.id
                                                        }
                                                    },
                                                    "note": null,
                                                    "userId": user.id,
                                                },
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        })
        console.log('... done!')
    }

    console.timeEnd("Seeding complete 🌱");
};

main()
    .then(() => {
        console.log("Process completed");
    })
    .catch((e) => console.log(e));