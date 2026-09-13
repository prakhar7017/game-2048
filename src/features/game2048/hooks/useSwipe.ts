import { useRef } from "react";
import type { Direction } from "../utils/gameLogic";

const SWIPE_THRESHOLD = 24;

export function useSwipe(onSwipe: (direction:Direction)=>void){

    const touchStart = useRef<{ x: number; y:number } | null>(null);

    function onTouchStart(e: React.TouchEvent){
        // store the first touch point's x/y into touchStart.current
        const touch = e.touches[0];
        touchStart.current= { x: touch.clientX, y: touch.clientY };
    }


    function onTouchEnd(e:React.TouchEvent) {
        if(!touchStart.current) return;
        // read touchStart.current, compare against e.changedTouches[0],
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStart.current.x;
        const dy = touch.clientY - touchStart.current.y;
        // then reset touchStart.current back to null
        touchStart.current=null;
        // compute dx/dy, decide direction, call onSwipe(direction),
        if(Math.max(Math.abs(dx),Math.abs(dy))<SWIPE_THRESHOLD) return;

        if(Math.abs(dx)>Math.abs(dy)) onSwipe(dx>0 ? 'right' : 'left');
        else onSwipe(dy>0 ? 'down': 'up');
    }

    return {onTouchStart,onTouchEnd};
}