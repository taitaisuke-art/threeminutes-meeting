$(function(){

  
function buildPost(message){
    var result= message.image? `<img class="lower-message_image" src="${message.image}" alt=""></img>`:""
    // if (imageがあれば) ?  20行目を加える : 空白の物を入れてあげる ""
    var html = `<div class='message'>
    <div class='upper-message'>
    <div class='upper-message__user-name'>
    ${message.user_name}
    </div>
    <div class='upper-message__date'>
    ${message.created_at}
    </div>
    </div>
    <div class='lower-message'>
    <p class='lower-message__content'>
    ${message.content}
    </p>
    ${result}
    </div>
    </div>
    </div>`
    return html;
  }


    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData =new FormData(this);
      var url =$(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        var html = buildPost(message);
        $('.messages').append(html);
        $('#new_message')[0].reset();
        $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      })
      .fail(function(){
        alert('メッセージ送信に失敗しました');
     })
     .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
    })
  });
  
  

  