import React from "react";
import {Navbar} from "@/components/navbar";
import {Head} from "@/layouts/head";
import {SearchBarProps} from "@/components/SearchBar";
import {DefaultsMenu} from "@/components/defaults/Defaults.Menu";
import clsx from "clsx";

type DefaultLayoutProps = {
    searchBoxProps?: SearchBarProps
    containerMaxWidth?: string
} & { children: React.ReactNode; }

export default function DefaultLayout({
                                          children,
                                          searchBoxProps,
                                          containerMaxWidth = "max-w-screen-md"
                                      }: DefaultLayoutProps) {
    return (
        <div className={clsx(
            `container items-center relative flex flex-col align-bottom h-screen basis-1/5 m-auto`,
        )}>
            <Head/>
            <Navbar searchBoxProps={searchBoxProps}/>
            <DefaultsMenu/>
            <main className={clsx(
                `flex w-full flex-col gap-8 ${containerMaxWidth}`,
                `px-6 md:px-0`
            )}>
                {children}
            </main>
        </div>
    );
}
