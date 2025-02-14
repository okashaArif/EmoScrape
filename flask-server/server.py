import json
from flask import Flask,request,jsonify
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask import session
import pandas as pd 
import praw
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from ntscraper import Nitter
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
# from nltk.corpus import wordnet
# from nltk.tokenize import sent_tokenize, word_tokenize
# from nltk.probability import FreqDist
# from textblob import TextBlob
import re
import string
from models import db, User
  
    
app = Flask(__name__)


app.config['SECRET_KEY'] = 'cairocoders-ednalan'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()
    

@app.route('/reddit' , methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text')
    # text="cricket"
    print("Input text:", text)
    reddit = praw.Reddit(
        client_id='PHJIXG6KR-wwnJ3g_u3ZPw',
        client_secret='R_3A6PyieTp_KZF1LJ_MvEWLL17Yww',
        redirect_uri='http://localhost:8080',
        user_agent='Scraper 1.0 by /u/ch_waleeed'
    )

    subreddit = reddit.subreddit(text)
    hot_posts = subreddit.hot(limit=100)

    # Create empty lists to store data
    contents = []
    # Loop through hot posts and collect data
    for post in hot_posts:
        contents.append(post.selftext)

    print("Contents:", contents)
    print("Number of posts collected:", len(contents))
    # Create a dictionary with data
    data_dict = {
    'Content': contents,
    }

    df = pd.DataFrame(data_dict)
    data=df['Content']
    data=data.to_list()
    documents = []
    stemmer = WordNetLemmatizer()
    for i in range(0, len(data)):
        # Remove all the special characters
        doc = re.sub(r'\W', ' ', str( data[i]))

        # remove all punctuations
        doc = re.sub(re.escape(string.punctuation), '', doc)

        # remove all single characters
        doc = re.sub(r'\s+[a-zA-Z]\s+', ' ',  doc)

        # Remove single characters from the start
        doc = re.sub(r'\^[a-zA-Z]\s+', ' ',  doc)

        # Substituting multiple spaces with single space
        doc = re.sub(r'\s+', ' ',  doc, flags=re.I)

        # Removing prefixed 'b'
        doc = re.sub(r'^b\s+', '',  doc)

        # Converting to Lowercase
        doc = doc.lower()

        # Lemmatization
        doc =  doc.split()
        doc = [stemmer.lemmatize(word) for word in  doc]
        doc = ' '.join( doc)
        doc = [ word for word in  doc.split() if word not in stopwords.words("english")]
        doc = ' '.join( doc)
        #encoding
        title=doc.encode("ascii", "ignore")
        doc = title.decode()
        documents.append( doc)
        
    print("Documents after preprocessing:", documents)
    print("Number of documents after preprocessing:", len(documents))
    df = pd.DataFrame()
    df['Content']=documents
    sia = SentimentIntensityAnalyzer()
    df['Sentiment Score'] = df['Content'].apply(lambda x: sia.polarity_scores(x)['compound'])
    df['Sentiment Label'] = df['Sentiment Score'].apply(lambda x: 'Positive' if x > 0 else ('Negative' if x < 0 else 'Neutral'))
    positive = df[df['Sentiment Label'] == 'Positive'].shape[0]
    negative = df[df['Sentiment Label'] == 'Negative'].shape[0]
    neutral = df[df['Sentiment Label'] == 'Neutral'].shape[0]
    tweets=df['Content'].to_list()
    final_data={
        'Text':tweets,
        'positive':positive,
        'negative':negative,
        'neutral':neutral,
    }
    print("Sentiment analysis results:")
    print("Positive:", positive)
    print("Negative:", negative)
    print("Neutral:", neutral)
    return jsonify(final_data)
    


@app.route('/twitter', methods=['POST'])
def analyze_sentiment1():
    data = request.json
    text = data.get('text')
    # text="cricket"
    scraper=Nitter(log_level=1, skip_instance_check=False)
    hot_posts=scraper.get_tweets(text,mode="hashtag" ,number=50)

    # Create empty lists to store data
    contents = []
    # Loop through hot posts and collect data
    for post in hot_posts['tweets']:
        contents.append(post['text'])
    # Create a dictionary with data
    data_dict = {
    'Content': contents,
    }

    df = pd.DataFrame(data_dict)
    data=df['Content']
    data=data.to_list()
    documents = []
    stemmer = WordNetLemmatizer()
    for i in range(0, len(data)):
        # Remove all the special characters
        doc = re.sub(r'\W', ' ', str( data[i]))

        # remove all punctuations
        doc = re.sub(re.escape(string.punctuation), '', doc)

        # remove all single characters
        doc = re.sub(r'\s+[a-zA-Z]\s+', ' ',  doc)

        # Remove single characters from the start
        doc = re.sub(r'\^[a-zA-Z]\s+', ' ',  doc)

        # Substituting multiple spaces with single space
        doc = re.sub(r'\s+', ' ',  doc, flags=re.I)

        # Removing prefixed 'b'
        doc = re.sub(r'^b\s+', '',  doc)

        # Converting to Lowercase
        doc = doc.lower()

        # Lemmatization
        doc =  doc.split()
        doc = [stemmer.lemmatize(word) for word in  doc]
        doc = ' '.join( doc)
        doc = [ word for word in  doc.split() if word not in stopwords.words("english")]
        doc = ' '.join( doc)
        #encoding
        title=doc.encode("ascii", "ignore")
        doc = title.decode()
        documents.append( doc)
        
    df = pd.DataFrame()
    df['Content']=documents
    sia = SentimentIntensityAnalyzer()
    df['Sentiment Score'] = df['Content'].apply(lambda x: sia.polarity_scores(x)['compound'])
    df['Sentiment Label'] = df['Sentiment Score'].apply(lambda x: 'Positive' if x > 0 else ('Negative' if x < 0 else 'Neutral'))
    positive = df[df['Sentiment Label'] == 'Positive'].shape[0]
    negative = df[df['Sentiment Label'] == 'Negative'].shape[0]
    neutral = df[df['Sentiment Label'] == 'Neutral'].shape[0]
    tweets=df['Content'].to_list()
    final_data={
        'Text':tweets,
        'positive':positive,
        'negative':negative,
        'neutral':neutral,
    }
    print("Sentiment analysis results:")
    print("Positive:", positive)
    print("Negative:", negative)
    print("Neutral:", neutral)
    return jsonify(final_data)


@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id
  
    return jsonify({
        "id": user.id,
        "email": user.email
    })

if __name__ == '__main__':
    app.run(debug=True)
