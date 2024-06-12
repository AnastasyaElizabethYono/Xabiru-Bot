import os
import numpy as np
from dotenv import load_dotenv
from langchain.callbacks.streaming_stdout_final_only import (
    FinalStreamingStdOutCallbackHandler,
)
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
import pandas as pd
from apps.services.models import FactNewCustomerRegion

from openai import AzureOpenAI
from utils.format import format_to_rupiah, to_camel_case
from langchain_openai import AzureChatOpenAI
# from langchain.llms import AzureOpenAI
from langchain.agents.agent_types import AgentType
from langchain_community.tools.wikipedia.tool import WikipediaQueryRun
from langchain_community.utilities.wikipedia import WikipediaAPIWrapper


# def get_bot_reply_message(prompt):
#     client = AzureOpenAI(
#         api_key=os.getenv("AZURE_OPENAI_API_KEY"),
#         api_version=os.getenv("OPENAI_API_VERSION"),
#         azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
#     )

#     response = client.chat.completions.create(
#         model=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"),
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt},
#         ],

#     )


#     return response.choices[0].message.content


# def get_bot_reply_message(prompt):
#     load_dotenv()
#     data = FactNewCustomerRegion.objects.all()
#     df = pd.DataFrame(list(data.values()))

#     llm = AzureChatOpenAI(
#         openai_api_version="2023-12-01-preview", azure_deployment="test-demo"
#     )

#     api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=100)
#     tool = WikipediaQueryRun(api_wrapper=api_wrapper)
#     tools = [tool]
#     # agent
#     agent = create_pandas_dataframe_agent(
#         llm, df, 
#         extra_tools=tools, 
#         verbose=False, 
#         handle_parsing_errors=True
#     )

#     try:
#         # Assuming `invoke` method returns a dictionary with 'output' key on successful execution
#         response = agent.invoke({"input": prompt + "\nJawab dalam bahasa indonesia"})[
#             "output"
#         ]
#         if response == "N/A":
#             return "I couldn't understand your message. Please try again."
#         return response

#     except Exception as e:
#         # Log the error for debugging purposes if logging is set up in your project
#         # logging.error(f"Failed to get bot reply: {str(e)}")
#         print(
#             f"Error occurred: {str(e)}"
#         )  # Optional, for debugging, remove in production
#         return "I couldn't understand your message. Please try again."


# //menggunakan data manual

def preprocess_df(df: pd.DataFrame) -> pd.DataFrame:
    # Convert 'date' column to datetime
    df["date"] = pd.to_datetime(df["date"], dayfirst=False)
    df["bulan"] = df["date"].dt.month
    df["tahun"] = df["date"].dt.year
    df = df.drop(["datekey"], axis=1)

    return df


def get_default_prompt():
    prompt = [
        "Nama anda adalah Xabirubot",
        "Selalu jawab dalam Bahasa Indonesia",
        "Nama dataframe adalah Fact Customer Region",
        "Jika pertanyaan tidak relevan dengan data Fact New Customer Region, maka anda tidak dapat menjawabnya"
        "Pada setiap pertanyaan yang berkaitan dengan amount atau budget, konversikan angka menjadi format Rupiah",
    ]
    return "\n".join(prompt)


def get_advanced_prompt(df: pd.DataFrame):
    prompt = ""

    # 1. Columns and Rows
    prompt += f"Dataset terdiri atas {df.shape[0]} baris dan {df.shape[1]} kolom dengan rincian : {', '.join([to_camel_case(col) for col in df.columns.to_list()])}. \n"
    # 2. Recorded Date
    recorded_years = np.sort(df["tahun"].unique())
    recorded_month_years = [
        df["bulan"][df["tahun"] == year].unique() for year in recorded_years
    ]

    prompt += f"Data tersedia untuk waktu {'; '.join([f'Tahun {year} : {str(np.sort(recorded_month_years[i]))}' for i, year in enumerate(recorded_years)])}. Selain itu, maka tidak ada data yang tersimpan. \n"

    df_monthly_budget = (
        df[df["kurs"] == "IDR"].groupby(["tahun", "bulan"])["target"].sum()
    )
    df_monthly_budget = pd.Series(df_monthly_budget, dtype=np.int64)

    prompt += f"Total target (Rp) urut sesuai data tersedia waktu {'; '.join([f'{tahun}: {str(df_monthly_budget[tahun].tolist())}' for year in recorded_years])}"

    # Yearly Budget
    # df_budget_yearly = df.groupby(df["date"].dt.year)["budget"].sum()
    # years = df_budget_yearly.index
    # prompt += f"Total budget secara berurutan pada tahun {' '.join(str(year) for year in years.to_list())} adalah {', '.join([format_to_rupiah(budget) for budget in df_budget_yearly])}. \n"

    return prompt


def get_bot_reply_message(prompt):
    load_dotenv()

    client = AzureOpenAI(
        azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
        api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
        api_version="2024-02-01",
    )

    data = FactNewCustomerRegion.objects.all()

    df = pd.DataFrame(list(data.values()))
    df = preprocess_df(df)

    default_prompt = get_default_prompt()

    advanced_prompt = get_advanced_prompt(df)

    final_prompt = default_prompt + "\n" + advanced_prompt + "\n" + prompt

    try:
        # Assuming `invoke` method returns a dictionary with 'output' key on successful execution
        completion = client.chat.completions.create(
            model=os.environ.get("AZURE_OPENAI_DEPLOYMENT_NAME"),
            messages=[{"role": "user", "content": final_prompt}],
            max_tokens=100,
        )

        response = completion.choices[0].message.content
        if response == "N/A":
            return "I couldn't understand your message. Please try again."
        return response

    except Exception as e:
        # Log the error for debugging purposes if logging is set up in your project
        # logging.error(f"Failed to get bot reply: {str(e)}")
        print(str(e))  # Optional, for debugging, remove in production
        return "I couldn't understand your message. Please try again."


