\echo 'Creating an empty database for SatTrace' 
\prompt 'Enter the password for the user sattrace: ', pass
create user sattrace with encrypted password :pass;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 10.4

-- Started on 2018-09-01 10:07:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2149 (class 1262 OID 17704)
-- Name: sattrace; Type: DATABASE; Schema: -; Owner: sattrace
--

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

--
-- TOC entry 1 (class 3079 OID 12393)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2151 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 186 (class 1259 OID 17731)
-- Name: category; Type: TABLE; Schema: public; Owner: sattrace
--

CREATE TABLE public.category (
    id bigint NOT NULL,
    name character varying(20) NOT NULL,
    description character varying(280)
);


ALTER TABLE public.category OWNER TO sattrace;

--
-- TOC entry 185 (class 1259 OID 17729)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: sattrace
--

CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO sattrace;

--
-- TOC entry 2152 (class 0 OID 0)
-- Dependencies: 185
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sattrace
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 188 (class 1259 OID 17758)
-- Name: tle; Type: TABLE; Schema: public; Owner: sattrace
--

CREATE TABLE public.tle (
    id bigint NOT NULL,
    name character varying(24) NOT NULL,
    line1 character(69) NOT NULL,
    line2 character(69) NOT NULL,
    category bigint DEFAULT 1 NOT NULL
);


ALTER TABLE public.tle OWNER TO sattrace;

--
-- TOC entry 187 (class 1259 OID 17756)
-- Name: tle_id_seq; Type: SEQUENCE; Schema: public; Owner: sattrace
--

CREATE SEQUENCE public.tle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tle_id_seq OWNER TO sattrace;

--
-- TOC entry 2153 (class 0 OID 0)
-- Dependencies: 187
-- Name: tle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sattrace
--

ALTER SEQUENCE public.tle_id_seq OWNED BY public.tle.id;


--
-- TOC entry 2011 (class 2604 OID 17734)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: sattrace
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 2012 (class 2604 OID 17761)
-- Name: tle id; Type: DEFAULT; Schema: public; Owner: sattrace
--

ALTER TABLE ONLY public.tle ALTER COLUMN id SET DEFAULT nextval('public.tle_id_seq'::regclass);


--
-- TOC entry 2141 (class 0 OID 17731)
-- Dependencies: 186
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: sattrace
--

INSERT INTO public.category (id, name, description) VALUES (1, 'No category', NULL);


--
-- TOC entry 2143 (class 0 OID 17758)
-- Dependencies: 188
-- Data for Name: tle; Type: TABLE DATA; Schema: public; Owner: sattrace
--



--
-- TOC entry 2154 (class 0 OID 0)
-- Dependencies: 185
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sattrace
--

SELECT pg_catalog.setval('public.category_id_seq', 2, true);


--
-- TOC entry 2155 (class 0 OID 0)
-- Dependencies: 187
-- Name: tle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sattrace
--

SELECT pg_catalog.setval('public.tle_id_seq', 1, false);


--
-- TOC entry 2015 (class 2606 OID 17736)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: sattrace
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 2019 (class 2606 OID 17763)
-- Name: tle tle_pkey; Type: CONSTRAINT; Schema: public; Owner: sattrace
--

ALTER TABLE ONLY public.tle
    ADD CONSTRAINT tle_pkey PRIMARY KEY (id);


--
-- TOC entry 2017 (class 2606 OID 17738)
-- Name: category unq_name; Type: CONSTRAINT; Schema: public; Owner: sattrace
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT unq_name UNIQUE (name);


--
-- TOC entry 2021 (class 2606 OID 17765)
-- Name: tle unq_tle; Type: CONSTRAINT; Schema: public; Owner: sattrace
--

ALTER TABLE ONLY public.tle
    ADD CONSTRAINT unq_tle UNIQUE (name, line1, line2);


--
-- TOC entry 2022 (class 2606 OID 17766)
-- Name: tle fk_category; Type: FK CONSTRAINT; Schema: public; Owner: sattrace
--

ALTER TABLE ONLY public.tle
    ADD CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE SET DEFAULT;


-- Completed on 2018-09-01 10:07:41

--
-- PostgreSQL database dump complete
--

