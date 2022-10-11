export const url = "http://localhost:5000/api" 

export const setHader = () =>{
    const headers = {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
    };
    return headers
}