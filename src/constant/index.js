/**
 * Created by hawaijar on 7/4/17.
 */
const categories = {
    CURRENT: ["currentlyReading", "Currently Reading"],
    WISH: ["wantToRead", "Want to Read"],
    READ: ["read", "Read"],
    NONE: ["none", "None"],
    map: {
        "Want to Read": "wantToRead",
        "Currently Reading": "currentlyReading",
        "Read": "read",
        "None": "none"
    }
};
const fetchActions = {
    FETCH: 0,
    SEARCH: 1
};
export {
    fetchActions,
    categories
}