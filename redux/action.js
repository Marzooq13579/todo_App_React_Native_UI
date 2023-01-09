import axios from "axios";

const serverUrl = "http://10.0.2.2:5000/api/v1"; //Change this url according to your server

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};

export const addTask = (title, description) => async (dispatch) => {
  try {
    dispatch({ type: "addTaskRequest" });

    const { data } = await axios.post(
      `${serverUrl}/newTask`,
      {
        title,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "addTaskSuccess", payload: data.message });
  } catch (error) {
    console.log("error is", error);
    dispatch({ type: "addTaskFailure", payload: error.response.data.message });
  }
};

export const updateTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: " updateTaskRequest" });

    const { data } = await axios.get(
      `${serverUrl}/task/${taskId}`,
    );
    dispatch({ type: " updateTaskSuccess", payload: data.message });
  } catch (error) {
    console.log("error is", error);
    dispatch({
      type: " updateTaskFailure",
      payload: error.response.data.message,
    });
  }
};


export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteTaskRequest" });

    const { data } = await axios.delete(
      `${serverUrl}/task/${taskId}`,
    );
    dispatch({ type: "deleteTaskSuccess", payload: data.message });
  } catch (error) {
    console.log("error is", error);
    dispatch({
      type: " deleteTaskFailure",
      payload: error.response.data.message,
    });
  }
};
