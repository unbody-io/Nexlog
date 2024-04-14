import {ParsedUrlQuery} from "querystring";
import {QueryContextItem, QueryContextKey} from "@/types/data.types";

export const getQueryContext = (query: ParsedUrlQuery): QueryContextItem[] => {
    return [
        {
            key: QueryContextKey.topic,
            value: query.topics
        },
        {
            key: QueryContextKey.keyword,
            value: query.keywords
        },
        {
            key: QueryContextKey.entity,
            value: query.entities
        }
    ].filter((item) => item.value !== undefined && item.value !== "undefined" && item.value !== null && item.value !== "");
}

export const getPostLink = (slug: string): string => {
    return `/posts/${slug}`
}


export const isQueryEmpty = (q: string|undefined = ""): boolean => {
    return q === undefined || q === null || q === "" || q === "undefined" || (q.trim() === "");
}



export const isValidParam = (value: string | string[] | undefined | null) => {
    const isValid = (v: string | string[] | undefined | null) => {
        if (v === undefined || v === null || typeof v === 'undefined') {
            return false;
        }
        if (typeof v === 'string') {
            return v.trim().length > 0;
        }
        return true;
    }

    if(Array.isArray(value)) {
        return value.filter(isValid).length > 0;
    }
    return isValid(value);
}


export const buildQueryUrl = (path: string, params: ParsedUrlQuery, requiredParams: string[] = []): string|null => {
    const queryString = Object.entries(params)
        .filter(([key, value]) => isValidParam(value) && requiredParams.includes(key))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    return requiredParams.length===0 || queryString.length > 0 ? `${path}?${queryString}` : null;
}
