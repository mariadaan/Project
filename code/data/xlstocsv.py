import pandas as pd

excel_files = [
    'centrum_excel.xlsx',
    'west_excel.xlsx',
    'nieuw-west_excel.xlsx',
    'zuid_excel.xlsx',
    'oost_excel.xlsx',
    'noord_excel.xlsx',
    'zuidoost_excel.xlsx'
    ]
# for file in excel_files:
#     data_xls = pd.read_excel(file, '2', index_col=None)
    # data_xls.to_csv('files.csv', encoding='utf-8', index=False)

for file in excel_files:
    data_xls = pd.read_excel(file, '2', index_col=0)
    # Select rows with index values 'totaal', with all columns between 'tot € 425' and '> € 681'
    data_xls = data_xls.loc['totaal']
    with open('files.csv', 'a') as f:
        print(data_xls)
        # if row.str[:6] is 'totaal':
        data_xls.to_csv(f, header=False)

# df = pd.concat([pd.read_excel(f) for f in excel_files])
# df.to_csv('files.csv', index=False)
