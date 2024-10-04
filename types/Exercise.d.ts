type ExerciseEntry = {
    exerciseName: string;
    measureUnit: string;
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
