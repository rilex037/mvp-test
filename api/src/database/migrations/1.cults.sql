CREATE TABLE mv.cults (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT cults_pk PRIMARY KEY (id),
	CONSTRAINT cults_un UNIQUE (name)
);