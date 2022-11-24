$(document).ready(function () {
  list = "";
  $.get(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
    (data) => {
      data.drinks.forEach((drink) => {
        list += `<option>${drink.strIngredient1}</option>`;
      });
      console.log(list);
      $("#select").append(list);
    }
  );
  $("#aleatoire").click(function (e) {
    e.preventDefault();
    $("#reponse").html("");
    $.get(
      `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
      function (data) {
        console.log(data);
        data.drinks.forEach((element) => {
          ingre = "";
          for (i = 1; i < 16; i++) {
            const key = `strIngredient${i}`;
            if (element[key] != null) {
              ingre += element[key] + " | ";
            } else if (element[key] == null) {
              ingre = ingre.slice(0, -3);
              break;
            }
          }
          $("#reponse")
            .append(`<div id="t"><div id="res"><h3>${element.strDrink}</h3></div><div id="oue">
          <img src="${element.strDrinkThumb}">
          <p id="i">${ingre}</p></div></div>`);
        });
      }
    );
  });
  $("#chercher").click(function (e) {
    e.preventDefault();
    $("#reponse").html("");
    var cocktail = $("#cocktail").val();
    $.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`,
      function (data) {
        data.drinks.forEach((element) => {
          ingre = "";
          for (i = 1; i < 16; i++) {
            const key = `strIngredient${i}`;
            if (element[key] != null) {
              ingre += element[key] + " | ";
            } else if (element[key] == null) {
              ingre = ingre.slice(0, -3);
              break;
            }
          }
          $("#reponse")
            .append(`<div id="t"><div id="res"><h3>${element.strDrink}</h3></div><div id="oue">
          <img src="${element.strDrinkThumb}">
          <p id="i">${ingre}</p></div></div>`);
        });
      }
    );
  });
  $("#ingreChercher").click(function (e) {
    {
      $("#reponse").html("");
      e.preventDefault();
      $.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${$(
          "#select"
        ).val()}`,
        function (data) {
          console.log(data);
          for (i = 0; i < data.drinks.length; i++) {
            console.log(data.drinks[i].strDrink);
            $.get(
              `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${data.drinks[i].strDrink}`,
              function (data) {
                console.log(data);
                data.drinks.forEach((element) => {
                  ingre = "";
                  for (i = 1; i < 16; i++) {
                    const key = `strIngredient${i}`;
                    if (element[key] != null) {
                      ingre += element[key] + " | ";
                    } else if (element[key] == null) {
                      ingre = ingre.slice(0, -3);
                      break;
                    }
                  }
                  $("#reponse")
                    .append(`<div id="t"><div id="res"><h3>${element.strDrink}</h3></div><div id="oue">
                    <img src="${element.strDrinkThumb}">
                    <p id="i">${ingre}</p></div></div>`);
                });
              }
            );
          }
        }
      );
    }
  });
});
