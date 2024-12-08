export enum MeasureUnits {
    'reps' = 'reps',
    'seconds' = 'seconds'
}

export type MeasureUnitType = `${MeasureUnits}`;

export type IdentifiableObjcet = {
    id: number;
}

export type ExerciseEntry = IdentifiableObjcet & {
    exerciseName: string;
    measureUnit: MeasureUnitType;
    measureCount: string;
    videoUrl?: string;
    previewImageUrl?: string;
    note?: string;
};

export type Section = IdentifiableObjcet & {
    name: string;
    roundCount: number;
    exercises?: ExerciseEntry[];
};

export type Workout = IdentifiableObjcet & {
    name: string;
    sections?: Section[];
};

export type ExerciseProgram = IdentifiableObjcet & {
    name: string;
    workouts?: Workout[];
};
