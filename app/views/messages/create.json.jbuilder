json.content                @message.content
json.user_name              @message.user.name
json.created_at             @message.created_at.strftime("%Y/%m/%d(#{%w(Sun Mon Tue Wed Thu Fri Sat)[Time.now.wday]}) %H:%M:%S")
json.image                  @message.image.url
json.id                     @message.id