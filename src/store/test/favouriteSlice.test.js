import reducer,{clearFavouriteState} from "../favouriteSlice";
it("should return initial state of favouriteSlice", () => {
  expect(reducer(undefined, {})).toEqual({
    favourite: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  });
});

it("should clear favourite state while logout", () => {
  expect(
    reducer(
      {
        favourite: ["123456","123456"],
        isSuccess: true,
      },
      clearFavouriteState()
    )
  ).toEqual({
    favourite: [],
    isSuccess: false,
  });
});