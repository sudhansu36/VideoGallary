import reducer, { clearContentState } from "../contentSlice";
it("should return initial state of contentSlice", () => {
  expect(reducer(undefined, {})).toEqual({
    contentCollection: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  });
});

it("should clear content state while logout", () => {
  expect(
    reducer(
      {
        contentCollection: [{ mname: "vip" }, { mname: "don" }],
        isSuccess: true,
      },
      clearContentState()
    )
  ).toEqual({
    contentCollection: [],
    isSuccess: false,
  });
});
