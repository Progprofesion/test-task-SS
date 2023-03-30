import { EventType } from "@testing-library/react";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/index';
import { setCurrentBoard, setCurrentItem, setDisabledDrop } from "src/store/reducer/dropStore";
import { TuseDelete } from "src/hooks/useDelete";

type TchildNodes = {
    style: {
        boxShadow: string
        cursor: string
    }
    draggable: boolean
}

type TQuerySelectorAll = (selector: string) => NodeListOf<Element>;

export type TuseStartOverLeaveEnd = {
    type: string
    e: EventType
    id: number
    items: []
    target: {
        className: {}
        parentNode: {
            style: {
                zIndex: string
                height: string
            }
            childNodes: []
            firstChild: {
                firstChild: {
                    style: {
                        display: string
                        top: string
                    }
                }
            }
        }
        parentElement: {
            childNodes: TchildNodes[]

        }
        previousSibling: {
            style: {
                boxShadow: string
            }
        }
        lastChild: {
            firstChild: {
                style: {
                    display: string
                    top: string
                    bottom: string
                }
            }
        }
        firstChild: {
            draggable: boolean
            style: {
                display: string
                top: string
                bottom: string
                cursor: string
            }
            firstChild: {
                style: {
                    display: string
                    top: string
                    cursor: string
                    bottom: string
                }
            }
        }
        style: {
            opacity: string
            cursor: string
            boxShadow: string
            maxHeight: string
            border: string
            width: string
            display: string
        }
        draggable: boolean
        querySelectorAll: TQuerySelectorAll
        childNodes: []
    }
    preventDefault: () => void
    stopPropagation: () => void
}


const useStartOverLeaveEnd = () => {

    const palleteWrapp: HTMLDivElement | null = document.querySelector(".pallete__wrapp");

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const disabledDrop = useSelector((state: RootState) => state.dropStore.disabledDrop);

    const dataClone = JSON.parse(JSON.stringify(dropState))
    const dispatch = useDispatch();

    const [disabledSpan, setDisabledSpan] = useState<boolean>(false)

    const dragStartHandler = (e: TuseStartOverLeaveEnd, board: TuseStartOverLeaveEnd, item: TuseStartOverLeaveEnd): void => {
        dispatch(setCurrentBoard(board))
        dispatch(setCurrentItem(item))

        const board2: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".pallete__wrapp")

        if (dataClone[1].items.length === 0) {
            board2[1].style.background = " #F0F9FF"
        }


        if (board.id === 1 && e.target.className === "pallete__display") {
            // подсветка для инпута в начало массива
            setDisabledSpan(true)
        }

        if (board.id === 1) {
            e.target.parentNode.style.zIndex = "-1"
        }

        if (board.id === 2) {
            palleteWrapp!.style.zIndex = "-1"
        }
    }

    const dragOverHandler = (e: TuseStartOverLeaveEnd, board: { id: number }) => {
        e.preventDefault();
        console.log(e.target)
        //  два практически одинаковых условия_________
        if (e.target.className === "pallete__wrapp" && e.target.lastChild && disabledSpan) {
            e.target.firstChild.firstChild.style.display = "block"
            e.target.firstChild.firstChild.style.top = "-7px"
            e.target.firstChild.firstChild.style.bottom = "unset"
        }



        if (e.target.className === "pallete__wrapp" && e.target.lastChild && !disabledSpan) {
            e.target.lastChild.firstChild.style.display = "block"
            e.target.lastChild.firstChild.style.top = "unset"
            e.target.lastChild.firstChild.style.bottom = "7px"
        }

        if (e.target.className !== "pallete__wrapp" && e.target.lastChild && disabledSpan) {
            e.target.parentNode.firstChild.firstChild.style.display = "block"
            e.target.parentNode.firstChild.firstChild.style.top = "-7px"

        }

        // if (e.target.className !== "pallete__wrapp" && e.target.firstChild && !disabledSpan && e.target.className !== "pallete__display") {
        //     e.target.firstChild.style.display = "block"
        //     e.target.firstChild.style.top = "-7px"
        // }


        if (board && board.id === 2) {
            if (e.target.className === "pallete__span" && dataClone[1].items.length > 0 && !disabledSpan) {
                e.target.style.display = "block"
                console.log(e.target)

            }

            if (e.target.className === "pallete__display" && dataClone[1].items.length > 0 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "unset"
                e.target.firstChild.style.bottom = "6px"

            }


            if (e.target.className === "pallete__operations" && dataClone[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-8px"
                e.target.firstChild.style.bottom = "unset"
                setDisabledSpan(false)

            }
            if (e.target.className === "pallete__dial" && dataClone[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-7px"
                e.target.firstChild.style.bottom = "unset"
                setDisabledSpan(false)
            }
            if (e.target.className === "pallete__equally" && dataClone[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-7px"
                e.target.firstChild.style.bottom = "unset"
                setDisabledSpan(false)
            }
        }

    }

    const dragLeaveHandlear: any = (e: TuseStartOverLeaveEnd) => {
        if (e.target.className === "pallete__wrapp" && e.target.firstChild) {
            e.target.firstChild.firstChild.style.display = "none"
        }

        if (e.target.className === "pallete__display") {
            e.target.firstChild.style.display = "none"

        }
        if (e.target.className === "pallete__operations") {
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__dial") {
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__equally") {
            e.target.firstChild.style.display = "none"
        }
    }

    const dragEndHandler: any = (e: TuseStartOverLeaveEnd, board: { id: number }) => {

        setDisabledSpan(false)

        const board2: any = document.querySelectorAll(".pallete__wrapp")
        if (dataClone[1].items.length >= 0) {
            board2[1].style.background = "none"
        }

        // убирает место дропа
        board2[1].childNodes.forEach((item: { firstChild: { style: { display: string } } }) => {
            item.firstChild.style.display = "none"
        })

        if (board.id === 1 && disabledDrop) {
            e.target.style.opacity = "50%"
            e.target.draggable = false
            e.target.style.cursor = "not-allowed"
            e.target.style.boxShadow = "none"
            e.target.querySelectorAll('.pallete__display-input').forEach((node: any) => {
                node.style.cursor = "not-allowed"
            })
            e.target.querySelectorAll('.pallete__operations-buttons').forEach((node: any) => {
                node.style.cursor = "not-allowed"
            })
            e.target.querySelectorAll('.pallete__operations').forEach((node: any) => {
                node.style.cursor = "not-allowed"
                node.style.boxShadow = "none"
            })
            e.target.querySelectorAll('.pallete__dial-button').forEach((node: any) => node.style.cursor = "not-allowed")
            if (e.target.className === "pallete__display") {
                e.target.style.boxShadow = "none"
            }
            dispatch(setDisabledDrop(false))
        }

        e.target.childNodes.forEach((child: { style: { boxShadow: string } }) => {
            child.style.boxShadow = "none"
        })

        e.target.parentNode.style.zIndex = "1"
        palleteWrapp!.style.zIndex = "1"

    }


    return {
        dragStartHandler,
        dragOverHandler,
        dragLeaveHandlear,
        dragEndHandler
    }
}

export default useStartOverLeaveEnd