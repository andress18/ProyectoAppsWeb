const getUsers = async () => {
    let response = [];
  await fetch("http://localhost:9000/users")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      response = res.data;
    });
    return response;
};

export { getUsers };
