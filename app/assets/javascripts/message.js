$(function(){

  
function buildPost(message){
    var result= message.image? `<img class="lower-message_image" src="${message.image}" alt="">`:""
    var html = `<div class='message'  data-message-id= ` + message.id + `>
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url:"api/messages" ,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      let insertHTML = '';

//取得したメッセージたちをEach文で分解
      messages.forEach(function(message){

//htmlを作り出して、それを変数に代入(作り出す処理は非同期の時に作った)
        insertHTML = buildPost(message); 

//変数に代入されたhtmlをmessagesクラスにぶち込む
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('更新に失敗しました');
    });
  };
}
  setInterval(reloadMessages, 5000);
});
  
  
  

  