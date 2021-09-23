import reducer, { reLogin, clearLoginState } from "../userSlice";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    userObj: {},
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidLoginMessage: "",
  });
});

it("should set the user while refresh", () => {
  expect(
    reducer(
      {
        userObj: {},
        isSuccess: false,
      },
      reLogin({ name: "sudhansu", email: "s@s.com", password: "123456" })
    )
  ).toEqual({
    userObj: { name: "sudhansu", email: "s@s.com", password: "123456" },
    isSuccess: true,
  });
});

it("should clear login state while logout", () => {
  expect(
    reducer(
      {
        userObj: { name: "sudhansu" },
        isSuccess: true,
      },
      clearLoginState()
    )
  ).toEqual({
    userObj: {},
    isSuccess: false,
  });
});
