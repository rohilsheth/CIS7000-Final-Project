from openai import Completion, ChatCompletion, Embedding
from tenacity import (
    retry,
    stop_after_attempt,
    wait_random_exponential,
)  # for exponential backoff


@retry(wait=wait_random_exponential(min=1, max=60), stop=stop_after_attempt(6))
def get_completion(args):
    # openai.api_key = OPENAI_API_KEY
    return Completion.create(**args)


@retry(wait=wait_random_exponential(min=1, max=60), stop=stop_after_attempt(6))
def get_chat_completion(messages):
    # openai.api_key = OPENAI_API_KEY
    response = ChatCompletion.create(
        model="gpt-4",
        messages=messages,
    )
    return response


@retry(wait=wait_random_exponential(min=1, max=60), stop=stop_after_attempt(6))
def get_embeddings(input):
    return Embedding.create(
        input=input,
        engine="text-embedding-ada-002")