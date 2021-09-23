import reducer from "../favouriteSlice";
it("should return initial state of favouriteSlice", () => {
  expect(reducer(undefined, {})).toEqual({
    favourite: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  });
});
