#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "clairvoyance_<%= serviceName %>_development";
  CREATE DATABASE "clairvoyance_<%= serviceName %>_test";

  GRANT ALL PRIVILEGES ON DATABASE clairvoyance_<%= serviceName %>_development to postgres;
  GRANT ALL PRIVILEGES ON DATABASE clairvoyance_<%= serviceName %>_test to postgres;
EOSQL
