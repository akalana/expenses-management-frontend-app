const API = {
    GET_USERS: {
      path: "/users",
      method: "GET",
    },
    GET_USER: {
      path: (id: string) => `/users/${id}`,
      method: "GET",
    },
    CREATE_USER: {
      path: "/users",
      method: "POST",
    },
    UPDATE_USER: {
      path: (id: string) => `/users/${id}`,
      method: "PATCH",
    },
  }
  //
  export default API
  