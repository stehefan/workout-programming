export enum MeasureUnits {
    'reps' = 'reps',
    'seconds' = 'seconds'
}

export type MeasureUnitType = `${MeasureUnits}`;

export type IdentifiableObject = {
    id: number;
}

export type ExerciseEntry = IdentifiableObject & {
    exerciseName: string;
    measureUnit: MeasureUnitType;
    measureCount: string;
    videoUrl?: string;
    image?: ExerciseImage;
    note?: string;
};

export type Section = IdentifiableObject & {
    name: string;
    roundCount: number;
    exercises?: ExerciseEntry[];
};

export type Workout = IdentifiableObject & {
    name: string;
    sections?: Section[];
};

export type ExerciseProgram = IdentifiableObject & {
    name: string;
    workouts?: Workout[];
};
