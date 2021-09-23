import reducer from "../watchlistSlice";
it("should return initial state of watchlistSlice", () => {
  expect(reducer(undefined, {})).toEqual({
    watchList: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  });
});
