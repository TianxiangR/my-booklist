import pandas as pd
import random
import lorem
import json
import uuid

df = pd.read_csv('Books.csv')

# slice first 200 rows
df = df[:200]

categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Mathematics', 'History', 'Biography', 'Autobiography', 'Self-Help', 'Cooking', 'Travel', 'Health', 'Fitness', 'Sports', 'Business', 'Economics', 'Politics', 'Philosophy', 'Religion', 'Spirituality', 'Psychology', 'Sociology', 'Anthropology', 'Archeology', 'Art', 'Music', 'Film', 'Theatre', 'Dance', 'Photography', 'Fashion', 'Design', 'Architecture', 'Literature', 'Poetry', 'Drama', 'Mystery', 'Thriller', 'Horror', 'Romance', 'Fantasy', 'Science Fiction', 'Young Adult', 'Children', 'Comics', 'Graphic Novels', 'Manga', 'History', 'Biography', 'Autobiography', 'Self-Help', 'Cooking', 'Travel', 'Health', 'Fitness', 'Sports', 'Business', 'Economics', 'Politics', 'Philosophy', 'Religion', 'Spirituality', 'Psychology', 'Sociology', 'Anthropology', 'Archeology', 'Art', 'Music', 'Film', 'Theatre', 'Dance', 'Photography', 'Fashion', 'Design', 'Architecture', 'Literature', 'Poetry', 'Drama', 'Mystery', 'Thriller', 'Horror', 'Romance', 'Fantasy', 'Science Fiction', 'Young Adult', 'Children', 'Comics', 'Graphic Novels', 'Manga']

for row in range(len(df)):   
    df.loc[row, 'price'] = random.randint(10, 100) - 0.01
    df.loc[row, 'description'] = lorem.paragraph()
    df.loc[row, 'id'] = str(uuid.uuid4())
    df.loc[row, 'category'] = random.choice(categories)
    
    # rename Book-Title to title
    df.rename(columns={'Book-Title': 'title'}, inplace=True)
    
    # rename Book-Author to author
    df.rename(columns={'Book-Author': 'author'}, inplace=True)
    
# save to json
df.to_json('Books.json', orient='records')

with open('Books.json') as f:
    data = json.load(f)
    for row in data:
      del row['ISBN']
      del row['Year-Of-Publication']
      del row['Publisher']
      del row['Image-URL-S']
      del row['Image-URL-M']
      del row['Image-URL-L']

with open('Books.json', 'w') as f:
    json.dump(data, f, indent=2)