import ReactGA from "react-ga";

function enterPlayer(player, title) {
    ReactGA.event({
        category: "Video", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: "Entered playback session", // String. Required. A description of the behaviour.
        label: title.assetId, // Title assetId
        value: Math.floor(player.currentTime()), // Current position in video (seconds)
        nonInteraction: false, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function exitPlayerViaBackButton(player, title) {
    ReactGA.event({
        category: "Video", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: "Exited playback session via back button", // String. Required. A description of the behaviour.
        label: title.assetId, // Title assetId
        value: Math.floor(player.currentTime()), // Current position in video (seconds)
        nonInteraction: false, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function exitPlayerViaWindowClose(player, title) {
    ReactGA.event({
        category: "Video", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: "Exited playback session via window close", // String. Required. A description of the behaviour.
        label: title.assetId, // Title assetId
        value: Math.floor(player.currentTime()), // Current position in video (seconds)
        nonInteraction: false, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function endedBuffering(player, title, value) {
    ReactGA.event({
        category: "Video", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: "Pause while buffering", // String. Required. A description of the behaviour.
        label: title.assetId, // Title assetId
        value: value, // Buffer time causing playback delay
        nonInteraction: true, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function playbackXpercent(player, title, X) {
    ReactGA.event({
        category: "Video", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: `Played ${X}%`, // String. Required. A description of the behaviour.
        label: title.assetId, // Title assetId
        value: Math.floor(player.currentTime()), // Buffer time causing playback delay
        nonInteraction: true, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function castingStarted(player, title, value) {
    ReactGA.event({
        category: "Video", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: "Cast session started", // String. Required. A description of the behaviour.
        label: title.assetId, // Title assetId
        value: Math.floor(player.currentTime()), // Buffer time causing playback delay
        nonInteraction: false, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function castingStopped(player, title, value) {
    ReactGA.event({
        category: "Video", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: "Cast session stopped", // String. Required. A description of the behaviour.
        label: title.assetId, // Title assetId
        value: Math.floor(player.currentTime()), // Buffer time causing playback delay
        nonInteraction: false, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function playerErrorDuringInitialisation(err) {
    ReactGA.event({
        category: "Error", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: "Player error during initialisation", // String. Required. A description of the behaviour.
        label: `${err.name}: ${err.message_}`, // Title assetId
        value: err.errCode, // Buffer time causing playback delay
        nonInteraction: false, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function playerErrorDuringPlayback(err) {
    ReactGA.event({
        category: "Error", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
        action: "Player error during playback", // String. Required. A description of the behaviour.
        label: `${err.name}: ${err.message_}`, // Title assetId
        value: err.errCode, // Buffer time causing playback delay
        nonInteraction: false, // Boolean. Optional. If an event is not triggered by a user interaction
    });
}

function logException(description, fatal = false) {
    ReactGA.exception({
        description: description,
        fatal: fatal,
    });
}

function setBitrate(player) {
    var stats = player.getStats();
    ReactGA.set({ dimension1: `${stats.width} x ${stats.height}` });
    // TODO  - not reaching GA for some reason...
}

function setPlayerSessionDuration(player) {
    var stats = player.getStats();
    ReactGA.set({ metric1: Math.floor(stats.playTime) });
    // TODO  - not reaching GA for some reason...
}

const GoogleAnalyticsHits = {
    enterPlayer,
    exitPlayerViaBackButton,
    exitPlayerViaWindowClose,
    endedBuffering,
    setBitrate,
    setPlayerSessionDuration,
    playbackXpercent,
    castingStarted,
    castingStopped,
    playerErrorDuringInitialisation,
    playerErrorDuringPlayback,
    logException,
};

export default GoogleAnalyticsHits;

// function placeHolder(videojs, title) {
// 	ReactGA.event({
// 		category: "Video", // String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
// 		action: "Started video", // String. Required. A description of the behaviour.
// 		label: title.assetId, // String. Optional. More precise labelling of the related action.
// 		value: "", // Int. Optional. A means of recording a numerical value against an event. E.g. a rating, a score, etc.
// 		nonInteraction: true, // Boolean. Optional. If an event is not triggered by a user interaction
// 	});
// }
