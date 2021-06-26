# Name:Yarin Hazani
# ID: 313200560

from flask import Flask, request, abort, make_response
from Settings import db_password
import requests
import mysql.connector as mysql
import json
import uuid
import bcrypt

app = Flask(__name__)

db = mysql.connect(
    host="localhost",
    user="root",
    password=db_password,
    database="blog"
)

print(db)

@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	print(data)
	query = "select id, password, username from users where username = %s"
	values = (data['username'], )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	if not record:
		abort(401)
	user_id = record[0]
	username = record[2]
	hashed_password = record[1].encode('utf-8')
	if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_password) != hashed_password:
	 	abort(401)
	session_id = str(uuid.uuid4())
	query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id = %s"
	values = (user_id, session_id, session_id)
	cursor.execute(query, values)
	db.commit()
	username_id = {"username": username, "user_id": user_id}
	resp = make_response(username_id)
	resp.set_cookie("session_id", session_id)
	return resp

@app.route('/logout', methods=['POST'])
def logout():
	data = request.get_json()
	query = "delete from sessions where user_id = %s"
	value = (data['user_id'], )
	cursor = db.cursor()
	cursor.execute(query, value)
	db.commit()
	cursor.close()
	resp = make_response()
	resp.set_cookie("session_id", '', expires=0)
	return resp

@app.route('/signup', methods=['POST'])
def register():
	data = request.get_json()
	print(data)
	query = "select id from users where username = %s"
	value = (data['username'], )
	cursor = db.cursor()
	cursor.execute(query, value)
	records = cursor.fetchall()
	print(records)
	if records:
		abort(401)
	hashed_pwd = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
	query = "insert into users (username, password) values (%s, %s)"
	values = (data['username'], hashed_pwd)
	cursor.execute(query, values)
	db.commit()
	new_user_id = cursor.lastrowid
	cursor.close()
	return 'New user id: ' + str(new_user_id)

@app.route('/posts/<id>')
def get_post_by_id(id):
    return get_post(id)

@app.route('/posts', methods=['GET', 'POST'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    else: 
        return add_post()

def add_post():
    data = request.get_json()
    query = "insert into posts (title, content, author) values (%s, %s, %s)"
    values = (data['title'], data['content'], data['author'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    return get_post(new_post_id)

def get_post(id):
    query = "select id, title, content, author from posts where id = %s"
    values = (id, )
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = ['id','title','content','author']
    return json.dumps(dict(zip(header, record)))

def get_all_posts():
    query = "select id, title, content, author from posts"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    header = ['id','title','content','author']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)

@app.route('/post/update/<id>', methods=['POST'])
def edit_post(id):
	print(id)
	data = request.get_json()
	return update_post(id, data)

def update_post(id, data):
	cursor = db.cursor()
	query = "update posts set `title`=%s, `content`=%s where `id`=%s"
	values = (data['title'], str(data['content']), id)
	cursor.execute(query, values)
	db.commit()
    # cursor.close()
	return "success"

@app.route('/post/delete/<id>', methods=['POST'])
def delete_post(id):
	cursor = db.cursor()
	query = "delete from posts where `id`=%s"
	values = (id, )
	cursor.execute(query, values)
	db.commit()
	cursor.close()
	return "success"

# The id here is the post id
@app.route('/post/comments/<id>', methods=['GET', 'POST'])
def manage_comments(id):
    if request.method == 'GET':
        return get_all_comments(id)
    else: 
        return add_comment(id)

def get_all_comments(id):
	query = "select content from comments where `post_id`=%s"
	values = (id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	records = cursor.fetchall()
	cursor.close()
	header = ['content']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
	return json.dumps(data)

def add_comment(id):
    data = request.get_json()
    query = "insert into comments (content, post_id) values (%s, %s)"
    values = (data['content'], id)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_comment_id = cursor.lastrowid
    cursor.close()
    return get_post(new_comment_id)

if __name__ == "__main__":
    app.run()