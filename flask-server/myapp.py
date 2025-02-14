from flask import Flask, render_template
import pandas as pd
import praw
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer


app = Flask(__name__)

@app.route('/')
def display_sentiment_analysis():
    # Initialize the Reddit API client
    reddit = praw.Reddit(
        client_id='PHJIXG6KR-wwnJ3g_u3ZPw',
        client_secret='R_3A6PyieTp_KZF1LJ_MvEWLL17Yww',
        redirect_uri='http://localhost:8080',
        user_agent='Scraper 1.0 by /u/ch_waleeed'
    )

    subreddit = reddit.subreddit('india')
    hot_posts = subreddit.hot(limit=20)

    # Create empty lists to store data
    titles = []
    authors = []
    scores = []
    contents = []
    urls = []
    num_comments = []

    # Loop through hot posts and collect data
    for post in hot_posts:
        titles.append(post.title)
        authors.append(post.author)
        scores.append(post.score)
        contents.append(post.selftext)
        urls.append(post.url)
        num_comments.append(post.num_comments)

    # Create a dictionary with data
    data_dict = {
        'Title': titles,
        'Author': authors,
        'Score': scores,
        'Content': contents,
        'URL': urls,
        'Number of Comments': num_comments
    }

    # Create a DataFrame from the data dictionary
    df = pd.DataFrame(data_dict)

    # Perform sentiment analysis using NLTK's SentimentIntensityAnalyzer
    nltk.download('vader_lexicon')
    sia = SentimentIntensityAnalyzer()
    df['Sentiment Score'] = df['Content'].apply(lambda x: sia.polarity_scores(x)['compound'])
    df['Sentiment Label'] = df['Sentiment Score'].apply(lambda x: 'Positive' if x > 0 else ('Negative' if x < 0 else 'Neutral'))

    # Save the DataFrame to a CSV file
    df.to_csv('redditIslamabad123.csv', encoding='utf-8', index=False)

    # Visualize the distribution of sentiment labels
    sns.set_style("whitegrid")
    plt.figure(figsize=(8, 6))
    sns.countplot(x='Sentiment Label', data=df, palette='Set2')
    plt.xlabel('Sentiment Label')
    plt.ylabel('Count')
    plt.title('Sentiment Analysis Results')
    
    # Save the plot as an image
    plot_path = 'static/sentiment_plot.png'
    plt.savefig(plot_path)

    # Render the HTML template and pass the plot image path
    return render_template('index.html', plot_path=plot_path)

if __name__ == '__main__':
    app.run(debug=True)
