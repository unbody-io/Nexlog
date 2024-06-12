import React from "react";
import DefaultSearchResultsList, {SearchResultListProps} from "@/components/defaults/Defaults.SearchResults.List";

const DefaultSearchResultsListBlocks = (props: SearchResultListProps) => {
    return (
        <DefaultSearchResultsList listClassName={"grid grid-cols-3 gap-4"}
                                  {...props}
        />
    )
}

export default DefaultSearchResultsListBlocks;
