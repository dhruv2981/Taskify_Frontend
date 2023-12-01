import axios from 'axios';
const Testing = () => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:8000/taskify/projects/10/";
      await axios
        .get(url, {
          headers: {
            Authorization: "Token " + localStorage.getItem("auth_token"),
          },
        })
        .then((response) => {
          console.log(response.data);
        });
    };
    fetchData();
  return (
    <div>testing</div>
  )
}
export default Testing