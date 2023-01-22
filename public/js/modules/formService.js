function formService() {

  const button = document.querySelector('.request_btn');

  $('.request_form form .request_btn').click(function(event) {

    event.preventDefault();
    if (!$('.request_form form .check').is(':checked')) {
      return;
    } 
    const formData = new FormData($('.request_form form')[0]);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        comment: formData.get('comment'),
    }
    $.ajax({
        url: 'https://api.slapform.com/sS0wObjpmM',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function(data) {
            console.log(data);
            $('.request_form form')[0].reset();
        }
    });    
   });
}
export default formService;