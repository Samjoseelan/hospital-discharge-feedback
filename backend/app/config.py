from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    database_url:str="postgresql+asyncpg://postgres:postgres@localhost:5432/hospital_feedback"
    secret_key:str="development-only-change-me"
    access_token_expire_minutes:int=60
    frontend_url:str="http://localhost:5173"
    model_config=SettingsConfigDict(env_file=".env",extra="ignore")
settings=Settings()
