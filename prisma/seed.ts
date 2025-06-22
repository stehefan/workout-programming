import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exercisesWithImages = [
    {
        title: "Pelvis Tilts",
        description: "Pelvis Tilts",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/pelvis_tilts_preview-u7oYYZhJFKRfisUo18kfSHltfFbGfB.png"
    },
    {
        title: "Bear plank serratus push ups",
        description: "Bear plank serratus push ups",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/bear_plank_serratus_preview-HUWB80DmcE1jwEVUz7U1ahwO8aaSDt.png"
    },
    {
        title: "Kneeling lean backs",
        description: "Kneeling lean backs",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/kneeling_lean_back_preview-iNiQmStNpedgk9godIBMuTwUk7tV6Y.png"
    },
    {
        title: "Vierfuessler Haende an Wand pull ups",
        description: "Vierfuessler Haende an Wand pull ups",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/vierfuessler_pull_preview-ChjXCByZ5nPBgD7fCrsNN000S73zbm.png"
    },
    {
        title: "half kneeling to knee drive (jump)",
        description: "half kneeling to knee drive (jump)",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/half_knee_drive_preview-zspW1XpaSCh6a7HJY4Bo5YaxZPFu0M.png"
    },
    {
        title: "Drop into push up",
        description: "Drop into push up",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/drop_push_up_preview-H0XgQ99OhsE4OnMvIRwo0rpZBTf4e2.png"
    },
    {
        title: "Split squat low jumps yielding",
        description: "Split squat low jumps yielding",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/split_squat_jumps_preview-6Bnk93r4kIRgzdx0bIjEXc79ezsxS6.png"
    },
    {
        title: "Front squat",
        description: "Front squat",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/front_squat_preview-XEPZLjFQ6a3NZvOwIGPy7MexhXFBOi.png"
    },
    {
        title: "Sit to jump",
        description: "Sit to jump",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/sit_to_jump_preview-NuSzCTg0lBMEgTwcHPeFtoHVLBHMmr.png"
    },
    {
        title: "Reziprok chest press KH",
        description: "Reziprok chest press KH",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/reziprok_chest_pres_preview-REv1HMVaj99ZZbZoZAkHDu9laiMqA2.png"
    },
    {
        title: "Ausfallschritt Kombi",
        description: "Ausfallschritt Kombi",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/ausfallschritt_kombi_preview-zP1Ld2S5fO6L1E7Y5iC6z3d8r1c3j5.png"
    },
    {
        title: "Jefferson curls",
        description: "Jefferson curls",
        imageUrl: "https://jzsirpofgtmehzlx.public.blob.vercel-storage.com/training/preview/jefferson_curls_preview-1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L.png"
    }
];

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
        console.log(`Creating images for user ${user.id} ...`);
        const imageMap = new Map<string, number>();
        for (const exercise of exercisesWithImages) {
            const newImage = await prisma.image.upsert({
                where: { imageUrl: exercise.imageUrl },
                update: {},
                create: {
                    ...exercise,
                    userId: user.id
                }
            });
            imageMap.set(exercise.title, newImage.id);
        }
        console.log('... done!')

        console.log(`Creating programs for user ${user.id} ...`);
        await prisma.program.create({
            data: {
                name: "First Program",
                userId: user.id,
                workouts: {
                    create: [
                        {
                            name: "Squat & push",
                            userId: user.id,
                            sections: {
                                create: [
                                    {
                                        name: "Breathing",
                                        roundCount: 1,
                                        userId: user.id,
                                        exercises: {
                                            create: [
                                                {
                                                    exerciseName: "Pelvis Tilts",
                                                    measureUnit: "reps",
                                                    measureCount: "∞",
                                                    videoUrl: process.env.SEED_PELVIS_TILTS_VIDEO,
                                                    note: "as many as you need um vom Kopf in den Körper zu kommen",
                                                    userId: user.id,
                                                    imageId: imageMap.get("Pelvis Tilts")
                                                },
                                                {
                                                    exerciseName: "Rolle",
                                                    measureUnit: "reps",
                                                    measureCount: "15-20",
                                                    videoUrl: null,
                                                    note: null,
                                                    userId: user.id,
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        name: "Positioning & Warm Up",
                                        roundCount: 2,
                                        userId: user.id,
                                        exercises: {
                                            create: [
                                                {
                                                    exerciseName: "Bear plank serratus push ups",
                                                    measureUnit: "reps",
                                                    measureCount: "8-10",
                                                    videoUrl: process.env.SEED_BEAR_PLANK_SERRAUS_PUSHUPS_VIDEO,
                                                    note: "One hand elevated: linker Ellenbogen nach außen, rechts nach hinten. Immer locker lassen ",
                                                    userId: user.id,
                                                    imageId: imageMap.get("Bear plank serratus push ups")
                                                },
                                                {
                                                    exerciseName: "Kneeling lean backs",
                                                    measureUnit: "reps",
                                                    measureCount: "6-8",
                                                    videoUrl: process.env.SEED_KNEELING_LEAN_BACKS_VIDEO,
                                                    note: null,
                                                    userId: user.id,
                                                    imageId: imageMap.get("Kneeling lean backs")
                                                },
                                                {
                                                    exerciseName: "Vierfuessler Haende an Wand pull ups",
                                                    measureUnit: "reps",
                                                    measureCount: "10-12",
                                                    videoUrl: process.env.SEED_VIERFUESSLER_HAND_AN_WAND_PULLUPS_VIDEO,
                                                    note: null,
                                                    userId: user.id,
                                                    imageId: imageMap.get("Vierfuessler Haende an Wand pull ups")
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        name: "Dynamics",
                                        roundCount: 2,
                                        userId: user.id,
                                        exercises: {
                                            create: [
                                                {
                                                    exerciseName: "half kneeling to knee drive (jump)",
                                                    measureUnit: "reps",
                                                    measureCount: "6-8",
                                                    videoUrl: process.env.SEED_HALF_KNEELING_TO_KNEE_DRIVE_VIDEO,
                                                    note: "Oben dann Gewicht auf die Ferse: Ellenbogen nach vorne ",
                                                    userId: user.id,
                                                    imageId: imageMap.get("half kneeling to knee drive (jump)")
                                                },
                                                {
                                                    exerciseName: "Drop into push up",
                                                    measureUnit: "reps",
                                                    measureCount: "8-10",
                                                    videoUrl: process.env.SEED_DROP_INTO_PUSHUP_VIDEO,
                                                    note: "Hintern runter ",
                                                    userId: user.id,
                                                    imageId: imageMap.get("Drop into push up")
                                                },
                                                {
                                                    exerciseName: "Split squat low jumps yielding",
                                                    measureUnit: "reps",
                                                    measureCount: "10",
                                                    videoUrl: process.env.SEED_SPLIT_SQUAT_LOW_JUMPS_YIELDING_VIDEO,
                                                    note: null,
                                                    userId: user.id,
                                                    imageId: imageMap.get("Split squat low jumps yielding")
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        name: "Mains",
                                        roundCount: 4,
                                        userId: user.id,
                                        exercises: {
                                            create: [
                                                {
                                                    exerciseName: "Front squat",
                                                    measureUnit: "reps",
                                                    measureCount: "5-6",
                                                    videoUrl: process.env.SEED_FRONT_SQUAT_VIDEO,
                                                    note: " Pauli style,  75kg; Fokus auf Hüfte unter den Körper bekommen",
                                                    userId: user.id,
                                                    imageId: imageMap.get("Front squat")
                                                },
                                                {
                                                    exerciseName: "Sit to jump",
                                                    measureUnit: "reps",
                                                    measureCount: "6-8",
                                                    videoUrl: process.env.SEED_SIT_TO_JUMP_VIDEO,
                                                    note: "Keine Ballerina Füße, Gewicht auf den Ballen und nicht auf die Zehen",
                                                    userId: user.id,
                                                    imageId: imageMap.get("Sit to jump")
                                                },
                                                {
                                                    exerciseName: "Reziprok chest press KH",
                                                    measureUnit: "reps",
                                                    measureCount: "8",
                                                    videoUrl: process.env.SEED_REZIPROKE_CHEST_PRESS_VIDEO,
                                                    note: "Anzahl pro Seite, Kopf in richtung heruntergehendem Arm, 12,5kg",
                                                    userId: user.id,
                                                    imageId: imageMap.get("Reziprok chest press KH")
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        name: "Accessories",
                                        roundCount: 2,
                                        userId: user.id,
                                        exercises: {
                                            create: [
                                                {
                                                    exerciseName: "Ausfallschritt Kombi",
                                                    measureUnit: "reps",
                                                    measureCount: "6",
                                                    videoUrl: process.env.SEED_AUSFALLSCHRITT_VIDEO,
                                                    note: null,
                                                    userId: user.id,
                                                    imageId: imageMap.get("Ausfallschritt Kombi")
                                                },
                                                {
                                                    exerciseName: "Jefferson curls",
                                                    measureUnit: "reps",
                                                    measureCount: "6",
                                                    videoUrl: process.env.SEED_JEFFERSON_CURLS_VIDEO,
                                                    note: "5kg",
                                                    userId: user.id,
                                                    imageId: imageMap.get("Jefferson curls")
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        });
        console.log("... done!");
    }
    console.timeEnd("Seeding complete 🌱");
};

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });