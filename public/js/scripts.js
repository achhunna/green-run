function requestUrl(url) {
  window.location.href = url;
}

$(document).ready(function () {
  $('button[data-toggle=modal]').click(function () {
    let id;
    if (typeof $(this).data('id') !== 'undefined') {
      id = $(this).data('id');
    }
    $('#id').val(id);
  });

  $('#searchBox').keyup(function () {
    const filterValue = $(this).val().toLowerCase();
    $('.beer-container').each(function () {
      if ($(this).children('.name')[0].innerHTML.toLowerCase().indexOf(filterValue) > -1) {
        $(this)[0].style.display = '';
      } else {
        $(this)[0].style.display = 'none';
      }
    });
  });
});
