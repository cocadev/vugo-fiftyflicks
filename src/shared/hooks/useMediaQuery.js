import { useEffect, useState } from "react";

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.<br />
 * It also monitor the document changes to detect when it matches or stops matching the media query.<br />
 * Returns the validity state of the given media query.
 *
 */
const useMediaQuery = (mediaQuery) => {
    const isBrowserSuppoertingMQ =
        typeof window === "undefined" &&
        typeof window.matchMedia === "undefined";

    const matches = isBrowserSuppoertingMQ
        ? !!window.matchMedia(mediaQuery).matches
        : null;

    const [isVerified, setIsVerified] = useState(matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQuery);
        const documentChangeHandler = () =>
            setIsVerified(!!mediaQueryList.matches);

        try {
            mediaQueryList.addEventListener("change", documentChangeHandler);
        } catch (e) {
            //Safari isn't supporting mediaQueryList.addEventListener
            console.error(e);
            mediaQueryList.addListener(documentChangeHandler);
        }

        documentChangeHandler();
        return () => {
            try {
                mediaQueryList.removeEventListener(
                    "change",
                    documentChangeHandler
                );
            } catch (e) {
                //Safari isn't supporting mediaQueryList.removeEventListener
                console.error(e);
                mediaQueryList.removeListener(documentChangeHandler);
            }
        };
    }, [mediaQuery]);

    return isVerified;
};

export default useMediaQuery;
