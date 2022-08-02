#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "clairvoyance_<%= integrationName %>_development";
  CREATE DATABASE "clairvoyance_<%= integrationName %>_test";

  GRANT ALL PRIVILEGES ON DATABASE clairvoyance_<%= integrationName %>_development to postgres;
  GRANT ALL PRIVILEGES ON DATABASE clairvoyance_<%= integrationName %>_test to postgres;
EOSQL
