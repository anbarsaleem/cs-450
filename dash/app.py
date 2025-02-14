from dash import Dash, dcc, html, Input, Output
import plotly.express as px
import pandas as pd

tips_df = pd.read_csv("tips.csv").dropna()

app = Dash(__name__)

app.layout = html.Div(
    children = [
        dcc.RadioItems(id="myradio", options=tips_df["size"].unique(), value=tips_df["size"].unique()[0], inline=True),
        dcc.Graph(id="mygraph", figure={})
    ]
)

@app.callback(Output(component_id="mygraph", component_property="figure"), Input(component_id="myradio", component_property="value"))
def myfunc(myinput):
    filtered_data = tips_df[tips_df["size"]==myinput]
    myfigure=px.scatter(x=filtered_data['total_bill'], y=filtered_data['tip'])
    return myfigure

if __name__ == "__main__":
    app.run(debug=True)
