function getLocalStorage(key) {
    let storage;
    if (!localStorage.getItem(key)) {
        storage = [];
    } else {
        storage = JSON.parse(localStorage.getItem(key));
    }
    return storage;
}

function getCurrentTitleFromLocalStorage(payload) {
    var progressObj = getLocalStorage("progress");
    progressObj = progressObj.find(
        (elem) => elem.uuid === payload.uuid || elem.id === payload.id
    );
    return progressObj;
}

function setProgress(payload) {
    var progress = getLocalStorage("progress");

    if (payload.uuid) {
        progress = progress.filter((elem) => elem.uuid !== payload.uuid);
    } else if (payload.id) {
        progress = progress.filter((elem) => elem.id !== payload.id);
    } else {
        return null;
    }

    var newProgress = {
        id: payload.id,
        uuid: payload.uuid,
        name: payload.name,
        currentTime: payload.currentTime,
    };

    progress.unshift(newProgress);
    localStorage.setItem("progress", JSON.stringify(progress));
}

function setBrowsingData(payload) {
    var browsingData = getLocalStorage("browsingData");

    if (payload.uuid) {
        browsingData = browsingData.filter(
            (elem) => elem.uuid !== payload.uuid
        );
    } else if (payload.id) {
        browsingData = browsingData.filter((elem) => elem.id !== payload.id);
    } else {
        return null;
    }

    var newData = {
        id: payload.id,
        uuid: payload.uuid,
        season_guid: payload.season_guid,
        name: payload.name,
        type: payload.type,
    };

    browsingData.unshift(newData);
    localStorage.setItem("browsingData", JSON.stringify(browsingData));
}

function getCurrentItemFromBrowsingData(id) {
    var lsProgress = getLocalStorage("browsingData");
    lsProgress = lsProgress.find((elem) => elem.uuid === id || elem.id === id);
    return lsProgress;
}

const tokenStorage = {
    getLocalStorage,
    setProgress,
    getCurrentTitleFromLocalStorage,
    setBrowsingData,
    getCurrentItemFromBrowsingData,
};

export default tokenStorage;
