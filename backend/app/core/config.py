from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    redis_url: str

    @property
    def SQLALCHEMY_DATABASE_URI(self):
        return self.database_url

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

