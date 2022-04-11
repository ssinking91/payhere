import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

// action type
const FOUR_MODAL = 'FOUR_MODAL';
const ALREADY_MODAL = 'ALREADY_MODAL';

const ADD_SEARCH_REPO = 'AFTER_DATA';
const DELETE_REPO = 'DELETE_REPO';

const COUNT_SCROLL = 'COUNT_SCROLL';
const GET_SEARCH_TEXT = 'GET_SEARCH_TEXT';
const ADD_SEARCH_LIST = 'ADD_SEARCH_LIST';

// action creator
const setFourModal = createAction(FOUR_MODAL);
const setAlreadyModal = createAction(ALREADY_MODAL);

const addSearchRepo = createAction(ADD_SEARCH_REPO, (addData) => ({ addData }));
const deleteRepo = createAction(DELETE_REPO, (deletedData) => ({
  deletedData,
}));

const countScroll = createAction(COUNT_SCROLL);
const getSearchText = createAction(GET_SEARCH_TEXT, (searchText) => ({
  searchText,
}));
const addSearchList = createAction(ADD_SEARCH_LIST, (list) => ({ list }));

// initialState
const initialState = {
  fourModal: false,
  alreadyModal: false,

  repoData: [],
  compareData: [],
  addRepo: [],

  countScroll: 2,
  searchText: '',
  searchList: [],
};

// reducer
export default handleActions(
  {
    [FOUR_MODAL]: (state, action) =>
      produce(state, (draft) => {
        console.log('FOUR_MODAL');
        draft.fourModal = !state.fourModal;
      }),

    [ALREADY_MODAL]: (state, action) =>
      produce(state, (draft) => {
        console.log('ALREADY_MODAL');
        draft.alreadyModal = !state.alreadyModal;
      }),

    [ADD_SEARCH_REPO]: (state, action) =>
      produce(state, (draft) => {
        console.log('ADD_SEARCH_REPO');
        draft.addRepo = [...state.addRepo, action.payload.addData];
      }),

    [DELETE_REPO]: (state, action) =>
      produce(state, (draft) => {
        console.log('DELETE_REPO');
        draft.addRepo = action.payload.deletedData;
      }),

    [COUNT_SCROLL]: (state, action) =>
      produce(state, (draft) => {
        console.log('COUNT_SCROLL');
        draft.countScroll = state.countScroll + 1;
      }),

    [GET_SEARCH_TEXT]: (state, action) =>
      produce(state, (draft) => {
        console.log('GET_SEARCH_TEXT');
        draft.searchText = action.payload.searchText;
      }),

    [ADD_SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        console.log('ADD_SEARCH_LIST');
        draft.searchList = [...action.payload.list];
      }),
  },
  initialState,
);

export {
  setFourModal,
  setAlreadyModal,
  addSearchRepo,
  deleteRepo,
  countScroll,
  getSearchText,
  addSearchList,
};
