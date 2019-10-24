# chatspace DB設計
Users
Messages
groups
groups_users


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|username|string|null: false|
|id|integer|
|password|string|null: false|
|password_confirmation|string|
### Association
- has_many messages
- has_many group_users
- has_many groups through: :group_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to group


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|
|group_name|string|null:false|
### Association
- has_many messages
- has_many group_users
- belongs_to users through: :group_users


## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|
|user_id|references|
|group_id|references|



