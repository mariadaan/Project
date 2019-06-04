import pandas as pd

excel_files = [
    'centrum_excel.xlsx',
    'amsterdam_excel.xlsx',
    'nieuw-west_excel.xlsx'
    ]

data_xls = pd.read_excel('centrum_excel.xlsx', '2', index_col=None)
data_xls.to_csv('centrum_excel.csv', encoding='utf-8', index=False)

# df = pd.concat([pd.read_excel(f) for f in excel_files])
# df.to_csv('files.csv', index=False)
