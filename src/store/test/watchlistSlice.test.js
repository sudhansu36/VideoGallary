import reducer,{clearWatchListState} from "../watchlistSlice";
it("should return initial state of watchlistSlice", () => {
  expect(reducer(undefined, {})).toEqual({
    watchList: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  });
});
it("should clear watchlist state while logout", () => {
  expect(
    reducer(
      {
        watchList: ["123456","123654"],
        isSuccess: true,
      },
      clearWatchListState()
    )
  ).toEqual({
    watchList: [],
    isSuccess: false,
  });
});