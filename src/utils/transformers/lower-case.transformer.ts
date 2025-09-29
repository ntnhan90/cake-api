import { type TransformFnParams } from "class-transformer";

export const lowerCaseTransformet = (params: TransformFnParams ): string =>
    params.value?.toLowerCase().trim();