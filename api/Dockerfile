# creating a python base with shared environment variables
FROM python:slim as python-base
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"


# builder-base is used to build dependencies
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
        build-essential

# Install Poetry - respects $POETRY_VERSION & $POETRY_HOME
ENV POETRY_VERSION=1.1.12
RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python

# We copy our Python requirements here to cache them
# and install only runtime deps using poetry
WORKDIR $PYSETUP_PATH
COPY ./poetry.lock ./pyproject.toml ./
RUN poetry install --no-dev


# 'dev' stage installs all dev deps and can be used to develop code.
FROM python-base as dev

# Copying poetry and venv into image
COPY --from=builder-base $POETRY_HOME $POETRY_HOME
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH

# Copying in our entrypoint
# COPY ./docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x . /opt/pysetup/.venv/bin/activate

# venv already has runtime deps installed we get a quicker install
WORKDIR $PYSETUP_PATH
RUN poetry install
WORKDIR /app
COPY . .
EXPOSE 8000
CMD [ "python", "src/manage.py", "runserver", "0.0.0.0:8000"]


# 'Test' stage runs our unit tests with unittest and coverage.  
FROM dev AS test
ENV CI_TESTS='True'
RUN --mount=type=secret,id=mysecret \ 
    DJANGO_SECRET_KEY=$(grep 'DJANGO_SECRET_KEY=' /run/secrets/mysecret | cut -d '=' -f2) && export DJANGO_SECRET_KEY && \
    coverage run --omit='src/manage.py,src/config/*,*/.venv/*,*/*__init__.py,*/tests.py,*/admin.py' src/manage.py test src  && \
    coverage report
