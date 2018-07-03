import { put, takeEvery } from 'redux-saga/effects';
import { callAllComments, callDeleteComment, callEditComments, callPostComment } from '../requests/commentRequests';

function* fetchAllComments(action) {
  try {
    yield put({ type: "REQUEST_START_COMMENT_REDUCER" })
    const comments = yield callAllComments();
    yield put({
      type: "SET_ALL_COMMENTS",
      payload: comments,
    })
    yield put({ type: "REQUEST_DONE_COMMENT_REDUCER" })
  } catch (error) {
    yield put({ type: "REQUEST_DONE_COMMENT_REDUCER" })
  }
}

function* fetchPostComment(action) {
  try {
    console.log('before');
    yield callPostComment(action.payload);
    console.log('after');
    yield put({
      type: 'FETCH_ALL_COMMENTS',
    });
  } catch (error) {

  }
}

function* fetchPutComment(action) {
  try {
    yield callEditComments(action);
    yield put({ type: "FETCH_ALL_COMMENTS" })
  } catch (error) {

  }
};

function* fetchDeleteComment(action) {
  try {
    yield callDeleteComment(action.id);
    yield put({ type: "FETCH_ALL_COMMENTS" })
  } catch (error) {

  }
}

function* commentSaga() {
  yield takeEvery("FETCH_ALL_COMMENTS", fetchAllComments);
  yield takeEvery("FETCH_POST_COMMENT", fetchPostComment);
  yield takeEvery("FETCH_PUT_COMMENT", fetchPutComment);
  yield takeEvery("FETCH_DELETE_COMMENT", fetchDeleteComment);
};

export default commentSaga;