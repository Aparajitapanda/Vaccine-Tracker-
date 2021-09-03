//console.log("client running");

const formData = document.querySelector("form");
const pin = document.querySelector("#pincode");
const date = document.querySelector("#date");
var table = document.getElementById("myTable");

formData.addEventListener("submit", (e) => {
  e.preventDefault();
  const pincode = pin.value;
  const day = date.value;

  table.textContent = "Loading ...";
  fetch(`/pindata?pincode=${pincode}&date=${day}`).then((response) => {
    response.json().then((data) => {
      $("#myTable").empty();
      //console.log(data);
      if (data.error) {
        table.textContent = data.error;
      } else {
        for (var i = 0; i < data.length; i++) {
          var row = `<tr>
							<td>${data[i].name}</td>
              <td>${data[i].address}</td>
							<td>${data[i].vaccine} | ${data[i].age}+</td>
              <td>${data[i].from}-${data[i].to}</td>
							<td>${data[i].d1} | Book now | ${data[i].d2}</td>
					  </tr>`;
          table.innerHTML += row;
        }
      }
    });
  });
});
