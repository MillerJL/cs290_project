#!/bin/bash

for((i=0; i<1000; i++)); do \
	echo "INSERT INTO test_pictures (pic_name, fk_user_id, thumb_name) VALUES ('test_pic.png', 23, 'test_thumb.png');"
done | mysql -u root -p cs290_db

