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
});
