type MeasureUnit = 'reps' | 'seconds';

type IdentifiableObjcet = {
    id: number;
}

type ExerciseEntry = IdentifiableObjcet & {
    exerciseName: string;
    measureUnit: MeasureUnit;
    measureCount: string;
    videoUrl?: string;
    previewImageUrl?: string;
    note?: string;
};

type Section = IdentifiableObjcet & {
    name: string;
    roundCount: number;
    exercises: ExerciseEntry[];
};

type Workout = IdentifiableObjcet & {
    name: string;
    sections: Section[];
};

type ExerciseProgram = Workout[];

export type { IdentifiableObject, ExerciseEntry, Section, Workout, ExerciseProgram };
