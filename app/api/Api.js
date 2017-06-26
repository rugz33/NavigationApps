export default (origin, destination) => {
  const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyCZNe3BkX6DI0MRR-GAzWELqfx0-6sfDGg`;
  console.log(URL);

  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}
