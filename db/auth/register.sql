INSERT INTO users (username, password, balance, user_img)
VALUES (${username}, ${password}, 0, 'https://images.unsplash.com/photo-1527161153332-99adcc6f2966?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')
RETURNING id, username, balance, user_img