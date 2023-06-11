$('#search-bar').keyup(function () {
  let dInput = this.value;
    $('#search-btn').attr('href', `/search?name=${dInput}`);
});
