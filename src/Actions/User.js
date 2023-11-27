import axios from "axios";
export const loginUser = (requestBody) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    console.log(requestBody);

    axios
      .post("/api/v1/login", requestBody, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          window.localStorage.setItem(
            "LOAD_USER_PREVIOUS_STATE",
            JSON.stringify(true)
          );
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch({
      type: "loginSuccess",
      // payload: response,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const { data } = axios
      .get("/api/v1/userProfile", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("i am here2");

        if (response.status === 200) {
          console.log(response);
          window.localStorage.setItem(
            "LOAD_USER_PREVIOUS_STATE",
            JSON.stringify(true)
          );
        } else {
          console.log(response.status);

          dispatch({
            type: "LoadUserFailure",
            payload: response.status,
          });
          window.localStorage.setItem(
            "LOAD_USER_PREVIOUS_STATE",
            JSON.stringify(false)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response,
    });
  }
};
