import {CategoryCardStack} from "@/components/CategoryCard.Stack";
import React from "react";
import {Category} from "@/types/data.types";
import {FadeIn} from "@/components/Transitions";
import {useTimer} from "@/utils/ui.utils";
import {Divider, Progress} from "@nextui-org/react";

type CategoryListProps = {
    categories: Category[]
    onOpen?: (index: number) => void
    onClosed?: () => void
}

export const CategoryList = ({categories, onOpen, onClosed}: CategoryListProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = React.useState<number>(-1);
    const [translateY, setTranslateY] = React.useState<number>(0);
    // const isTimeUp = useTimer(1000);

    const handleOpen = (i: number) => {
        if (openIndex === i) {
            setOpenIndex(-1)
            onClosed && onClosed()
            setTranslateY(0);
        } else {
            setOpenIndex(i)
            onOpen && onOpen(i)

            if (ref.current) {
                const clickedChild = ref.current.children[i] as HTMLElement;
                const offset = clickedChild.getBoundingClientRect().top
                setTranslateY(-1 * offset + 150);
            }
        }
    }

    return (
        <>
            {
                <div className={"flex flex-col gap-16 transition-all duration-750 ease-in-out"}
                     ref={ref}
                     style={{
                         transform: `translateY(${translateY}px)`
                     }}
                >
                    {
                        categories.map((category, index) => (
                            <div className={`animate-fadeIn`}
                                 style={{
                                     animationDelay: `${index * 150}ms`,
                                     animationFillMode: 'both',
                                 }}
                                 key={index}
                            >
                                <CategoryCardStack
                                    key={index}
                                    data={category}
                                    onOpen={() => handleOpen(index)}
                                    openIndex={openIndex}
                                    index={index}
                                    delay={index * 150}
                                />
                            </div>
                        ))
                    }

                </div>
            }
        </>
    )
}
