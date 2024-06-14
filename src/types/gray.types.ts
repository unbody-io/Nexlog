import {ContentHandler} from "@/lib/content-plugins";
import {HandlerPublicConfigs} from "@/lib/content-plugins/handler.class";
import {SearchConfig} from "@/types/plugins.types";
import {SiteData} from "@/types/data.types";
import {StructuredUserInput} from "@/types/prompt.types";

export type GrayConfigAll = {
    contentPlugins: ContentHandler<any, any>[]
    contentConfig: {
        exclude: string[],
        postsPath: string,
    },
    searchConfig: SearchConfig
    copy: {
        personaPromptInstruction: (siteData: SiteData) => string;
        promptsOutputFormatInstruction: (input: StructuredUserInput) => string;
    }
}

export type NextlogConfig = Partial<GrayConfigAll>;

export type NextLogConfigData = {
    plugins: HandlerPublicConfigs[];
    contentConfig: {
        exclude: string[],
        postsPath: string,
    },
}
