\echo 'Creating an empty database for SatTrace' 
\prompt 'Enter the password for the user sattrace: ' pass
create user sattrace with encrypted password :'pass';

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

CREATE DATABASE sattrace WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

ALTER DATABASE sattrace OWNER TO sattrace;

\connect sattrace

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE public.category (
    id bigint NOT NULL,
    name character varying(20) NOT NULL,
    description character varying(280)
);

ALTER TABLE public.category OWNER TO sattrace;

CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.category_id_seq OWNER TO sattrace;

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;

CREATE TABLE public.tle (
    id bigint NOT NULL,
    name character varying(24) NOT NULL,
    line1 character(69) NOT NULL,
    line2 character(69) NOT NULL,
    category bigint DEFAULT 1 NOT NULL
);

ALTER TABLE public.tle OWNER TO sattrace;

CREATE SEQUENCE public.tle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.tle_id_seq OWNER TO sattrace;

ALTER SEQUENCE public.tle_id_seq OWNED BY public.tle.id;

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);

ALTER TABLE ONLY public.tle ALTER COLUMN id SET DEFAULT nextval('public.tle_id_seq'::regclass);

INSERT INTO public.category (id, name, description) VALUES (1, 'No category', NULL);

SELECT pg_catalog.setval('public.category_id_seq', 2, true);

SELECT pg_catalog.setval('public.tle_id_seq', 1, false);

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tle
    ADD CONSTRAINT tle_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.category
    ADD CONSTRAINT unq_name UNIQUE (name);

ALTER TABLE ONLY public.tle
    ADD CONSTRAINT unq_tle UNIQUE (name, line1, line2);

ALTER TABLE ONLY public.tle
    ADD CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;