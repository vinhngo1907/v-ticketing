import { Response as ResponseBase } from "express";

export type ResponseUtils = {
    resSuccess(data?: unknown): ResponseUtils;
    resError(
        message: String,
        otherPayload?: Record<string, unknown>,
        options?: {
            statusCode?: number;
        }
    ): ResponseUtils
}

export type Response = ResponseBase & ResponseUtils;

