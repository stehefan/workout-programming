type MeasureUnit = 'reps' | 'seconds';

type ExerciseEntry = {
    id: number;
    exerciseName: string;
    measureUnit: MeasureUnit;
    measureCount: string;
    videoUrl: string;
    previewImageUrl: string;
    note?: string;
};

type Section = {
    name: string;
    roundCount: number;
    exercises: ExerciseEntry[];
};

type Workout = {
    name: string;
    sections: Section[];
};

type ExerciseProgram = Workout[];

export type { ExerciseEntry, Section, Workout, ExerciseProgram };
