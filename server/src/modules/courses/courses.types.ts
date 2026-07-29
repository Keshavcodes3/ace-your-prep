export type CourseDifficulty =
    | "beginner"
    | "intermediate"
    | "advanced";


export type CourseCategory =
    | "reasoning"
    | "quantitative-aptitude"
    | "verbal"
    | "programming"
    | "general";


export type PublishCourseInput = {
    courseId: string;
    isPublished: boolean;
};


export type CourseQuery = {
    category?: CourseCategory;

    difficulty?: CourseDifficulty;

    search?: string;

    page?: number;

    limit?: number;
};



export type CreateCourseInput = {
    title: string;
    description: string;
    isPublished: boolean;
    category: CourseCategory;

    difficulty: CourseDifficulty;

    thumbnail?: string;
};


export type UpdateCourseInput = Partial<CreateCourseInput>;


export type CourseResponse = {
    id: string;

    title: string;

    description: string;

    category: CourseCategory;

    difficulty: CourseDifficulty;

    thumbnail?: string;

    totalModules: number;

    totalLessons: number;

    isPublished: boolean;

    createdAt: Date;

    updatedAt: Date;
};