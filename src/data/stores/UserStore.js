export class Viewer extends Object {}

const VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.id = VIEWER_ID;


var users = {}
users[VIEWER_ID] = viewer

const usersById = {
    [VIEWER_ID]: viewer
};

export function registerViewer(viewer) {

    if(users[viewer.id] == undefined) {
        users[viewer.id] = viewer
    }
}

export function getViewer(viewerId) {
    return users[viewerId]
}
