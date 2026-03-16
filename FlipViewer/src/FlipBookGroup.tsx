import React from "react";
import { FlipBook, FlipState } from "./FlipBook";
import { ToneMapSettings } from "./flipviewer";
import { ImageContainerState } from "./ImageContainer";
import { group } from "console";

// export var FlipBookGroups: FlipBookGroup[];

// export type FlipBookRef = React.RefObject<FlipBook>;
// export type FlipBookGroupRef = React.RefObject<FlipBookGroup>;

export var FlipBookGroups = new Map<string, FlipBookGroup>();

// type SelectUpdateFn = (newIdx: number) => void;
// var selectUpdateListeners: SelectUpdateFn[] = [];
 
// type TMOUpdateFn = (groupName: string, newTMOSettings: ToneMapSettings) => void;
// var tmoUpdateListeners: TMOUpdateFn[] = [];
 
// type imageConStateUpdateFn = (groupName: string, newImgConState: ImageContainerState) => void;
// var imgConStateUpdateListeners: imageConStateUpdateFn[] = [];

// export interface FlipBookGroupState
// {
//     selectedIndex: number;
// }

// export interface FlipBookGroupProps
// {
//     flipbooks: FlipBookRef[];
//     groupname: string;
// }
export class FlipGroupState {
    selectedIdx: number;
    popupContent?: React.ReactNode;
    popupDurationMs?: number;
    hideTools: boolean;

    constructor() {
        this.selectedIdx = 0;
        this.hideTools = false;
    }
}

export class FlipBookGroup // extends React.Component<FlipBookGroupProps, FlipBookGroupState>
{ 
    // selectedIndex: number;
    flipbookGroupState: FlipGroupState;

    flipbooks: FlipBook[];
    groupName: string;

    constructor(groupName: string) 
    {
        this.flipbookGroupState = new FlipGroupState();
        this.groupName = groupName;
        this.flipbooks = [];
    }

    addFlipBook(flipbook: FlipBook)
    {
        this.flipbooks.push(flipbook);
    }

    // updateGroupState(index: number)
    // {

    // }

    // SetGroupIndex(newIdx: number) 
    // {
    //     // this.setState({
    //     //     selectedIndex: newIdx,
    //     // },
    //     // () => 
    //     // {
    //     //     this.onStateChange();
    //     // }
    //     // )    
    //     // this.selectedIndex = newIdx;
    //     // this.onStateChange();
    // }

    UpdateGroupFlipBookStateChange(state: FlipState)
    {
        this.flipbookGroupState.selectedIdx = state.selectedIdx;
        this.flipbookGroupState.hideTools = state.hideTools;
        this.flipbookGroupState.popupContent = state.popupContent;
        this.flipbookGroupState.popupDurationMs = state.popupDurationMs;

        for(let i in this.flipbooks)
        {
            this.flipbooks[i].setState(state);
        }
    }
 
    UpdateGroupTMOSettings(newTMOSettings: ToneMapSettings)
    {
        for (var i in this.flipbooks)
            this.flipbooks[i].tmoCtrls.current.applySettings(newTMOSettings);
    }
 
    UpdateGroupImageContainerSettings(newImgConState: ImageContainerState) 
    {
        for (var i in this.flipbooks)
            this.flipbooks[i].imageContainer.current.setState(newImgConState);
    }
}