import React, {useEffect} from "react";

export const useClickOutside = (ref: React.RefObject<Element>, onClickOutside: () => void) => {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && ref.current.contains(e.target as Node)) {
        return
      }

      onClickOutside()
    }
    // Bind
    document.addEventListener("click", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
