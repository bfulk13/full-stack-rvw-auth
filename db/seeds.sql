CREATE TABLE users (
    id serial primary key,
    username varchar(100),
    password varchar(100),
    balance integer,
    user_img varchar(255)
)