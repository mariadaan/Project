import pandas as pd
import json


df = pd.read_csv('database.csv')

with open('database.json', 'w') as outfile:
    outfile.write(df.set_index("Stadsdeel").to_json(orient='index'))
