export type RoutesSchema<T = Record<string, any>> = {
    [controller: string]: {
        [method: string]: T & {
            path: string;
        };
    };
};
