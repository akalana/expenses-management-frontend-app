const API = {
    GET_EXPENSES: {
        path: (userId: string) => `/users/${userId}/expenses`,
        method: "GET",
    },
    GET_EXPENSE: {
        path: (id: string, userId: string) => `/users/${userId}/expenses/${id}`,
        method: "GET",
    },
    CREATE_EXPENSE: {
        path: (userId: string) => `/users/${userId}/expenses`,
        method: "POST",
    },
    UPDATE_EXPENSE: {
        path: (userId: string, id: string) => `/users/${userId}/expenses/${id}`,
        method: "PATCH",
    },
    REMOVE_EXPENSE: {
        path: (userId: string, id: string) => `/users/${userId}/expenses/${id}`,
        method: "DELETE",
    },
}
//
export default API
