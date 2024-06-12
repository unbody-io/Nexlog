import {Button} from "@nextui-org/react";
import {TreeIcon} from "@/components/icons";
import React, {ChangeEventHandler, useEffect, useState} from "react";
import {Textarea} from "@nextui-org/input";
import clsx from "clsx";
import {useSearchBar} from "@/context/context.search-bar";
import {DefaultsTag} from "@/components/defaults/content-blocks/Defaults.Tag";
import {ESearchScope} from "@/types/ui.types";

export type SearchBarProps = {
    onSearch: (prompt: string) => void;
    onClear: () => void;
}


type ControlBarProps = {
    prompt: string | undefined;
    handleSearch: () => void;
    filters?: string[];
}

const ControlBar = ({prompt, handleSearch, filters = []}: ControlBarProps) => (
    <div className={"flex align-bottom scale-75 relative"}>
        <Button size={"sm"}
                className={`bg-gray-800 ${!prompt && "opacity-10"} rounded-3xl`}
                onClick={handleSearch}
                isIconOnly={true}
                disabled={!prompt}
        >
            <TreeIcon size={24}
                      fill={"white"}
            />
        </Button>
        {/*<Button isIconOnly={true}*/}
        {/*        size={"sm"}*/}
        {/*        className={clsx(*/}
        {/*            "absolute",*/}
        {/*            // "scale-[1.5]",*/}
        {/*            "rounded-xl",*/}
        {/*            "bg-gray-800"*/}
        {/*        )}*/}
        {/*        // color={"success"}*/}
        {/*        style={{*/}
        {/*            right: "-225%",*/}
        {/*            top: 0,*/}
        {/*            opacity: filters?.length ? 1 : 0*/}
        {/*        }}*/}
        {/*>*/}
        {/*    <FilterIcon size={24}*/}
        {/*              fill={"white"}*/}
        {/*    />*/}
        {/*</Button>*/}
    </div>
);

export const SearchBar = ({onSearch, onClear}: SearchBarProps) => {
    const [prompt, setPrompt] = useState<string>("");

    const {
        clearQuery,
        filters,
        query,
        setQuery,
        setFilters,
        scope,
        scopeLabel,
        pushQuery,
        pushFilters,
        setFocused
    } = useSearchBar();

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"&& !e.shiftKey) {
            handleSearch();
            e.preventDefault();
        }
    }

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        // here we need to recon the Enter key
        setPrompt(e.target.value);
    };

    const handleSearch = () => {
        onSearch(prompt);
        setQuery(prompt);
        if (scope === ESearchScope.global){
            pushQuery(prompt);
        }
    };

    const handleClear = () => {
        setPrompt("");
        onClear();
        clearQuery();
        if (scope === ESearchScope.global){
            pushQuery(prompt);
        }
    };

    useEffect(() => {
        if (query !== undefined) {
            setPrompt(query);
        }
    }, [query])

    const filtersArray = filters? filters?.split(",") : [];

    const placeholder = scopeLabel ?
        `Chat with "${scopeLabel.slice(0, 45)}..."`
        : "Search, explore, ask or chat...";

    return (
        <div className={"max-w-lg w-full relative flex flex-col"}>
            <form className={clsx(
                "flex flex-col w-full gap-2 relative", "relative"
            )}
                  onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch();
                  }}
            >
                <Textarea minRows={1}
                          size={"md"}
                          variant={"flat"}
                          onChange={onInputChange}
                          placeholder={placeholder}
                          value={prompt}
                          onKeyDown={onKeyPress}
                          onFocus={() => setFocused(true)}
                          onBlur={() => setFocused(false)}
                          classNames={{
                              input: [
                                  "bg-transparent",
                                  "text-black/90 dark:text-white/90",
                                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                  "transition-all",
                                  "autocomplete-off",
                                  "pt-1.5",
                              ],
                              inputWrapper: [
                                  "bg-transparent",
                                  "py-0 px-3",
                                  "shadow-none",
                                  "dark:bg-default/60",
                                  "backdrop-blur",
                                  "hover:bg-gray-200/10",
                                  "dark:hover:bg-default/70",
                                  "group-data-[focus=true]:bg-gray-200",
                                  "!cursor-text",
                              ],
                          }}
                          endContent={
                              <ControlBar prompt={prompt}
                                          handleSearch={handleSearch}
                                          filters={filters? filters.split(",") : []}
                              />
                          }
                />
            </form>
            <div className={"absolute"}
                 style={{
                     top: "calc(100% + 0.5rem)",
                 }}
            >
                {
                    filtersArray?.map((filter, index) => (
                        <DefaultsTag key={index}
                                     data={{key: filter, type: ""}}
                                     onDelete={() => {
                                         const n = filtersArray.filter((f) => f !== filter);
                                         console.log("n", n)
                                         setFilters(n.join(","));
                                         pushFilters(n.join(","));
                                     }}
                        />
                    ))
                }
            </div>
        </div>
    );
};
