$(document).ready(() => {
  renderTable();
  setInterval(() => {
    $.ajax({
      url: "http://localhost:3000/sensors",
      success: function(result) {
        renderTable();
      }
    });
  }, 5000);
});

const renderTable = () =>
  $.ajax({
    url: "http://localhost:3000/sensors",
    success: function(result) {
      $("#kitchenTableBody > tr").remove();
      $("#bedroomTableBody > tr").remove();
      $("#bathroomTableBody > tr").remove();
      $("#livingRoomTableBody > tr").remove();
      $("#outsideTableBody > tr").remove();
      Object.keys(result).forEach((key, i) => {
        const line = `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${key}</td>
          <td>${result[key]}</td>
        </tr>
      `;
        if (key.includes("Kitchen")) {
          $("#kitchenTableBody").append(line);
        }
        if (key.includes("BedRoom")) {
          $("#bedroomTableBody").append(line);
        }
        if (key.includes("BathRoom")) {
          $("#bathroomTableBody").append(line);
        }
        if (key.includes("LivingRoom")) {
          $("#livingRoomTableBody").append(line);
        }
        if (key.includes("Outside")) {
          $("#outsideTableBody").append(line);
        }
      });
    }
  });
