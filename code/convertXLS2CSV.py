import pandas as pd

data_xls = pd.read_excel('data.xlsx', 'Sheet1')
data_xls.set_index('Stadsdeel', inplace=True)
with open('database.csv', 'a') as f:
    data_xls.to_csv(f)
