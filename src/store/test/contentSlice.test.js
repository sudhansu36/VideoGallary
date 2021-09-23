import reducer from "../contentSlice";
it("should return initial state of contentSlice", () => {
  expect(reducer(undefined, {})).toEqual({
    contentCollection: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  });
});
