import { useEffect } from "react";

// Handle the click outside the ref element using a callback
// Ispired by
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
export default function useClickOutside(ref, callback) {
    useEffect(() => {
        function handleClickOutside(evt) {
            function testTarget(evt, ref) {
                return ref.current && !ref.current.contains(evt.target)
            }

            if (Array.isArray(ref)) {
                if (ref.every((r) => testTarget(evt, r))) {
                    if (typeof callback === "function") {
                        callback(evt);
                    }
                }
            } else {
                if (testTarget(evt, ref)) {
                    if (typeof callback === "function") {
                        callback(evt);
                    }
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}
