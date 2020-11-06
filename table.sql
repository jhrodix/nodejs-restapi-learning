-- Table: public.usuarios

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios
(
    nombre character varying(30) COLLATE pg_catalog."default" NOT NULL,
    apellido character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT usuarios_pkey PRIMARY KEY (nombre)
)

TABLESPACE pg_default;

ALTER TABLE public.usuarios
    OWNER to postgres;