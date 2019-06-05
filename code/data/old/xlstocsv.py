import pandas as pd
import xlrd

excel_files = [
    'centrum_excel.xlsx',
    'west_excel.xlsx',
    'nieuw-west_excel.xlsx',
    'zuid_excel.xlsx',
    'oost_excel.xlsx',
    'noord_excel.xlsx',
    'zuidoost_excel.xlsx'
    ]

hor_sheets = ['1','2']
ver_sheets = ['17','18','19','20']

# for file in excel_files:
#     data_xls = pd.read_excel(file, '2', index_col=None)
    # data_xls.to_csv('files.csv', encoding='utf-8', index=False)

for file in excel_files:
    for sheet in hor_sheets:
        data_xls = pd.read_excel(file, sheet, index_col=0)
        stadsdeel = pd.read_excel(file, 'inhoud')
        # stadsdeel = stadsdeel.loc['Stadsdeel']
        data_xls = data_xls.loc['totaal']
        with open('files.csv', 'a') as f:
            print(data_xls)
            data_xls.to_csv(f, header=False)

    for sheet in ver_sheets:
        data_xls = pd.read_excel(file, sheet, index_col=2)
        # data_xls = data_xls.loc['zittende bewoners']
        # with open('files.csv', 'a') as f:
        #     print(data_xls)
        #     data_xls.to_csv(f, header=False)
        df = pd.ExcelFile(file).parse(sheet) #you could add index_col=0 if there's an index
        x=[]
        x.append(df[2])
        print(x)

# df = pd.concat([pd.read_excel(f) for f in excel_files])
# df.to_csv('files.csv', index=False)
